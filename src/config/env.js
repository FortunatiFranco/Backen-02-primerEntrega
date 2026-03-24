import { config } from "dotenv";
config();

export const env = {
    MONGO_URL: process.env.MONGO_URL,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    PORT: process.env.PORT,
    TOKEN_SECRET: process.env.TOKEN_SECRET
}