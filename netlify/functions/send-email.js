import nodemailer from "nodemailer";

export default async function handler(event) {
  console.log("Function triggered");
  console.log("Event body:", event.body);

  try {
    const { to, subject, text } = JSON.parse(event.body);
    console.log("Parsed email data:", { to, subject, text });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.VITE_EMAIL,
        pass: process.env.VITE_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
    };

    console.log("Sending email with options:", mailOptions);
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
}
