import axios from "axios";
import config from "../config/config.js";

export async function sendEmail({ to, subject, html }) {
  const response = await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: { name: "Memora", email: config.BREVO_SENDER_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    },
    {
      headers: {
        "api-key": config.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    },
  );

  console.log("Email sent:", response.data);
  return response.data;
}