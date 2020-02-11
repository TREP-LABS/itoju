import nodemailer from 'nodemailer';
import mailgunTransport from 'nodemailer-mailgun-transport';
import emailAddressValidation from './templates/emailAddressValidation';
import config from '../../../config/vars';

const mailgunOptions = {
  auth: {
    api_key: config.mailgun.apikey,
    domain: config.mailgun.domain,
  },
};

const emailClient = nodemailer.createTransport(mailgunTransport(mailgunOptions));

const { NODE_ENV, ENFORCE_TEST_EMAILS } = process.env;
const enforceTestEmails = ENFORCE_TEST_EMAILS ? ENFORCE_TEST_EMAILS.toLocaleLowerCase() === 'true' : false;
if (NODE_ENV === 'test' && !enforceTestEmails) {
  emailClient.sendMail = ({ subject }) => {
    console.log(`"${subject}" email not sent because runtime is in test environment`);
    return Promise.resolve('');
  };
}

const sendEmailAddresValidation = (user, confirmationUrl) => emailClient.sendMail({
  from: config.email.noReply,
  to: user.email,
  subject: 'Please verify your email address',
  html: emailAddressValidation({ name: user.name, confirmationUrl }),
});

export default {
  emailClient,
  sendEmailAddresValidation,
};
