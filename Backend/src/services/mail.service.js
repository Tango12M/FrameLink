import config from "../config/config.js";
import axios from "axios";

export async function sendEmail({ to, subject, html }) {
  const response = await axios.post(
    config.BREVO_API_URL,
    {
      sender: { name: "FrameLink", email: config.BREVO_SENDER_EMAIL },
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