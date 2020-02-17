import testRunner from '../../utils/testRunner';

const loginDetails = user => ({
  phone: user.phone,
  password: user.stringPass,
});

const loginPath = '/v1/auth/login';

const testCases = [
  {
    title: 'should log user in succcessfully',
    request: context => ({
      method: 'post',
      path: loginPath,
      body: loginDetails(context.testGlobals.user),
    }),
    response: {
      status: 200,
      body: {
        success: true,
        message: 'Login successfully',
        data: {
          user: {
            _id: expect.any(String),
            name: expect.any(String),
            phone: expect.any(String),
            confirmedPhone: expect.any(Boolean),
          },
          token: expect.any(String),
        },
      },
    },
  },
  {
    title: 'should fail if user phone is not provided',
    request: context => ({
      method: 'post',
      path: loginPath,
      body: { ...loginDetails(context.testGlobals.user), phone: undefined },
    }),
    response: {
      status: 400,
      body: {
        success: false,
        message: 'Invalid request data',
        errors: {
          phone: ['"phone" is required'],
        },
      },
    },
  },
  {
    title: 'should fail if user does not exist',
    request: context => ({
      method: 'post',
      path: loginPath,
      body: { ...loginDetails(context.testGlobals.user), phone: '07088888888' },
    }),
    response: {
      status: 400,
      body: {
        success: false,
        message: 'Incorrect phone or password',
      },
    },
  },
  {
    title: 'should fail if user password is not provided',
    request: context => ({
      method: 'post',
      path: loginPath,
      body: { ...loginDetails(context.testGlobals.user), password: undefined },
    }),
    response: {
      status: 400,
      body: {
        success: false,
        message: 'Invalid request data',
        errors: {
          password: ['"password" is required'],
        },
      },
    },
  },
  {
    title: 'should fail if user password is not correct',
    request: context => ({
      method: 'post',
      path: loginPath,
      body: { ...loginDetails(context.testGlobals.user), password: `${context.testGlobals.user.stringPass}--` },
    }),
    response: {
      status: 400,
      body: {
        success: false,
        message: 'Incorrect phone or password',
      },
    },
  },
];

testRunner(testCases, 'User login', {});
