import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMagicLink = async (email, token) => {
  const url = `${process.env.CLIENT_URL}/magic-login?token=${token}`;

  await transporter.sendMail({
    from: `"AuthVerse" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "This is the magic login link",
    html: `<p>Click the ilnk to login: </p> <a href="${url}">${url}</a>`,
  });
};

export default sendMagicLink;
