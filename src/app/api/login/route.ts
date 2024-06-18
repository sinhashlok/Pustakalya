import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { loginSchema } from "@/schema/loginSchema";
import bcryptjs from "bcryptjs";
import { createJwtToken } from "@/utils/jwtToken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Zod validation
    const isValidLogInData = loginSchema.safeParse(body);
    if (!isValidLogInData) {
      return NextResponse.json(
        { message: "Invalid Input", success: false },
        { status: 400 }
      );
    }

    const { email, password } = body;
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "No such user exists", success: false },
        { status: 400 }
      );
    }

    // Password verify
    const verifyPassword = await bcryptjs.compare(password, user.password);
    if (!verifyPassword) {
      return NextResponse.json(
        { message: "Invalid password", success: false },
        { status: 400 }
      );
    }

    const token = await createJwtToken(user.id, user.name);
    const resData = {
      name: user.name,
      email: user.email,
      dob: user?.dob,
      address: user?.address,
    };

    const res = NextResponse.json(
      {
        message: "Login successful",
        success: true,
        data: resData,
        token: token,
      },
      { status: 200 }
    );
    res.cookies.set("token", token);
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
