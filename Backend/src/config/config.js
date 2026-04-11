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

if (!process.env.BREVO_API_URL) {
  throw new Error("BREVO_API_URL is not defined in environment variables");
}

if (!process.env.MISTRAL_API_KEY) {
  throw new Error("MISTRAL_API_KEY is not defined in environment variables");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

if (!process.env.IMAGEKIT_PUBLIC_KEY) {
  throw new Error("IMAGEKIT_PUBLIC_KEY is not defined in environment variables");
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error("IMAGEKIT_PRIVATE_KEY is not defined in environment variables");
}
if (!process.env.IMAGEKIT_URL_ENDPOINT) {
  throw new Error("IMAGEKIT_URL_ENDPOINT is not defined in environment variables");
}

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  FRONTEND_URL: process.env.FRONTEND_URL,
  BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL,
  BREVO_API_KEY: process.env.BREVO_API_KEY,
  BREVO_API_URL: process.env.BREVO_API_URL,
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
};

export default config;
