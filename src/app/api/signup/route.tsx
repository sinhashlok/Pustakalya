import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { signupSchema } from "@/schema/signupSchema";
import bcryptjs from "bcryptjs";
import sendEmailVerificationToken from "@/utils/sendEmailVerificationToken";
import { createJwtToken } from "@/utils/jwtToken";

export async function POST(req: NextRequest) {
  try {
    console.log("REQUEST", req);

    const body = await req.json();
    const isValidData = signupSchema.safeParse(body);

    if (!isValidData) {
      return NextResponse.json(
        { message: "Invalid data", success: false },
        { status: 400 }
      );
    }

    const { name, email, password } = body;

    // Check: If Email already exists
    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExists) {
      return NextResponse.json(
        { message: "Email already exists", success: false },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create User
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    await sendEmailVerificationToken({ email: email, userId: user.id });

    const token = await createJwtToken(user.id, user.name);

    const res = NextResponse.json(
      { message: "User created", success: true, token: token },
      {
        status: 200,
      }
    );
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
