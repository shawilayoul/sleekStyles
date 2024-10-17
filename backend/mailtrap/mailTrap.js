const { MailtrapClient } = require("mailtrap");

const TOKEN = "6c84755cb2069051d42e3bcbfe1a6cbc";

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "shawilmojowok@gmail.com",
    nami: "shawil",
  },
];

module.exports = {
  client,
  sender,
  recipients,
};
