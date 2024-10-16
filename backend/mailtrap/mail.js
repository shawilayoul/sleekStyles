const { sender, client } = require("./mailTrap");
const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./mailTrapTamplate.js");

//helper // Helper function to validate the email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const sendVeryficationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  /*if (!validateEmail(recipient)) {
    throw new Error("Invalid email address");
  }*/
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "verificationCode",
        verificationToken
      ),
    });
  } catch (error) {
    console.log(error);
    throw new Error("error sending verifiycation email", error);
  }
};

const sendWelcomeEmail = async (email, username) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "3c4b89be-db06-4707-a693-68268e34c506",
      template_variables: {
        company_info_name: "Shawil Tech",
        name: username,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("error sending verifiycation email", error);
  }
};

const sendresetPasswordEmail = async (email, url) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
      category: "Password Reset",
    });
  } catch (error) {
    console.log(error);
    throw new Error("error sending verifiycation email", error);
  }
};

const sentResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "password has been reset Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
  } catch (error) {
    console.log(error);
    throw new Error("error sending verifiycation email", error);
  }
};
module.exports = {
  sendVeryficationEmail,
  sendWelcomeEmail,
  sendresetPasswordEmail,
  sentResetSuccessEmail,
};
