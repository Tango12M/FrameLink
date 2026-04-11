import "dotenv/config";

if (!process.env.PORT) {
  throw new Error("PORT is not defined in environment variables");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is not defined in environment variables");
}

if (!process.env.BREVO_SENDER_EMAIL) {
  throw new Error("BREVO_SENDER_EMAIL is not defined in environment variables");
}

if (!process.env.BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY is not defined in environment variables");
}

if (!process.env.MISTRAL_API_KEY) {
  throw new Error("MISTRAL_API_KEY is not defined in environment variables");
}

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  FRONTEND_URL: process.env.FRONTEND_URL,
  BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL,
  BREVO_API_KEY: process.env.BREVO_API_KEY,
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
};

export default config;
