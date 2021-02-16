import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  const sessionSecret = process.env.SESSION_SECRET;
  const sessionName = process.env.SESSION_NAME;

  return withIronSession(handler, {
    password: sessionSecret,
    cookieName: sessionName,
    cookieOptions: {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    },
  });
}