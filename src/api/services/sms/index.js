import twilio from 'twilio';

const sendSms = async (data) => {
  const { to, from, body } = data;

  const accountSid = 'ACd4b693832e93b5894209b17f2877089d';
  const authToken = '91fe2f15e2b0b8e6607bea787f587116';
  const client = twilio(accountSid, authToken);

  await client.messages
    .create({ body, from, to })
    .then((message) => {
      console.log(message);
    });
};

export default { sendSms };
