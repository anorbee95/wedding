export default async function sendEmail() {
    console.log("meg lett hívva")
  const emailData = {
    to: "anorbee95@gmail.com",
    subject: "Test Email",
    text: "This is a test email sent from React!",
  };

  try {
    const response = await fetch("/.netlify/functions/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();
    console.log("Email sent successfully:", result.message);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
