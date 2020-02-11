import testRunner from '../../utils/testRunner';

const loginDetails = user => ({
  email: user.email,
  password: user.stringPass,
});

const loginPath = '/auth/login';

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
            email: expect.any(String),
            phone: expect.any(String),
            confirmedEmail: expect.any(Boolean),
            confirmedPhone: expect.any(Boolean),
          },
          token: expect.any(String),
        },
      },
    },
  },
  {
    title: 'should fail if user email is not provided',
    request: context => ({
      method: 'post',
      path: loginPath,
      body: { ...loginDetails(context.testGlobals.user), email: undefined },
    }),
    response: {
      status: 400,
      body: {
        success: false,
        message: 'Invalid request data',
        errors: {
          email: ['"email" is required'],
        },
      },
    },
  },
  {
    title: 'should fail if user email is not a valid email address',
    request: context => ({
      method: 'post',
      path: loginPath,
      body: { ...loginDetails(context.testGlobals.user), email: 'testt.com' },
    }),
    response: {
      status: 400,
      body: {
        success: false,
        message: 'Invalid request data',
        errors: {
          email: ['"email" must be a valid email'],
        },
      },
    },
  },
  {
    title: 'should fail if user does not exist',
    request: context => ({
      method: 'post',
      path: loginPath,
      body: { ...loginDetails(context.testGlobals.user), email: 'randomerandomeuser@gmail.com' },
    }),
    response: {
      status: 400,
      body: {
        success: false,
        message: 'Incorrect email or password',
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
        message: 'Incorrect email or password',
      },
    },
  },
];

testRunner(testCases, 'User login', {});
