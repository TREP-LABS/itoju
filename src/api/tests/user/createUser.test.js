import testRunner from '../../utils/testRunner';

const userDetails = {
  name: 'Test User',
  phone: '+2348089084015',
  password: 'Password12',
  confirmPassword: 'Password12',
};

const createUserPath = '/v1/auth/register';

const testCases = [
  {
    title: 'should create a user',
    request: {
      body: userDetails,
      method: 'post',
      path: createUserPath,
    },
    response: {
      status: 201,
      body: {
        success: true,
        message: 'user created successfully',
        data: {
          _id: expect.any(String),
          name: userDetails.name,
          phone: userDetails.phone,
          confirmedPhone: false,
        },
      },
    },
  },
  {
    title: 'should fail if user with the same phone already exist',
    request: context => ({
      method: 'post',
      path: createUserPath,
      body: {
        ...userDetails,
        phone: context.testGlobals.user.phone,
      },
    }),
    response: {
      status: 409,
      body: {
        success: false,
        message: 'User with this phone already exist',
      },
    },
  },
  {
    title: 'should fail if user name is not in request body',
    request: {
      method: 'post',
      path: createUserPath,
      body: { ...userDetails, name: undefined },
    },
    response: {
      status: 400,
      body: {
        success: false,
        message: 'Invalid request data',
        errors: {
          name: ['"name" is required'],
        },
      },
    },
  },
  {
    title: 'should fail if user name is less than 3 chars',
    request: {
      method: 'post',
      path: createUserPath,
      body: { ...userDetails, name: 'me' },
    },
    response: {
      status: 400,
      body: {
        success: false,
        message: 'Invalid request data',
        errors: {
          name: ['"name" length must be at least 3 characters long'],
        },
      },
    },
  },
  {
    title: 'should fail if user password is not in request body',
    request: {
      method: 'post',
      path: createUserPath,
      body: { ...userDetails, password: undefined },
    },
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
    // A weak password is a password that is less than 7 characters
    // and is not a mix of capital, small letters and numbers.
    title: 'should fail if password is weak',
    request: {
      method: 'post',
      path: createUserPath,
      body: { ...userDetails, password: 'password' },
    },
    response: () => ({
      status: 400,
      body: {
        success: false,
        message: 'Invalid request data',
        errors: {
          password: ['"password" must be at least 7 character mix of capital, small letters with numbers'],
        },
      },
    }),
  },
  {
    title: 'should fail if confirmPassword value is not in request body',
    request: {
      method: 'post',
      path: createUserPath,
      body: { ...userDetails, confirmPassword: undefined },
    },
    response: {
      status: 400,
      body: {
        success: false,
        message: 'Invalid request data',
        errors: {
          confirmPassword: ['"confirmPassword" is required'],
        },
      },
    },
  },
  {
    title: 'should fail if confirm password value does not match password value',
    request: {
      method: 'post',
      path: createUserPath,
      body: { ...userDetails, confirmPassword: `${userDetails.password}ttt` },
    },
    response: {
      status: 400,
      body: {
        success: false,
        message: 'Invalid request data',
        errors: {
          confirmPassword: ['"confirmPassword" must match the password value'],
        },
      },
    },
  },
];

testRunner(testCases, 'Create user', {});
