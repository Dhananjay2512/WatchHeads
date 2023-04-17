import nodeMailer from "nodemailer";
import bcrypt from "bcrypt";

const getHrTime = () => {
  var datetime = new Date(Date.now());
  console.log("Before: ", datetime);
  datetime.setHours(datetime.getHours() + 1);
  console.log("After: ", datetime);
  return datetime;
};

const sendEmail = async (email: string, subject: string, html: string) => {
  const transporter = nodeMailer.createTransport({
    // host: "smtp-mail.outlook.com", // hostname
    service: "gmail",
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  let mailOptions = {
    from: process.env.AUTH_USER, // sender address
    to: email, // list of receivers
    subject: subject, // Subject
    html: html,
  };

  await transporter.sendMail(mailOptions);
};

export { sendEmail, getHrTime };
