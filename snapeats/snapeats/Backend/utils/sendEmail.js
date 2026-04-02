import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text, filePath) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      attachments: [
        {
          filename: "invoice.pdf",
          path: filePath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");

  } catch (error) {
    console.error("Email error:", error);
  }
};

export default sendEmail;