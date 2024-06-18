import { Resend } from "resend";
import bcryptjs from "bcryptjs";
import prisma from "@/db";

type Props = {
  email: string;
  userId: number;
};

export default async function sendEmailVerificationToken({ email, userId }: Props) {
  const resend = new Resend(process.env.RESEND_API || "");
  const token = Math.ceil(Math.random() * 8999 + 1000);
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      verifyToken: token + "",
    },
  });

  await resend.emails
    .send({
      from: "dev.me@resend.dev",
      to: email,
      subject: "Verification Email",
      html: `<div>
    <h1>Email Verification</h1>
    <br />
    <p>Code: ${token}</p>
    </div>`,
    })
    .catch((error) => console.log("Email Error", error));
}
