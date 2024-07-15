import prisma from "@/db";
import { updateNameSchema } from "@/schema/updateDetails";
import { authTokenUserId, verifyJwtToken } from "@/utils/jwtToken";
import sendEmailVerificationToken from "@/utils/sendEmailVerificationToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Authorization Token
    const bearerToken = req.headers.get("authorization") || "";
    const userId = await authTokenUserId(bearerToken);
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthenticated", success: false },
        { status: 401 },
      );
    }

    const body = await req.json();
    const isValidData = updateNameSchema.safeParse(body);
    if (!isValidData.success) {
      return NextResponse.json(
        { message: isValidData?.error, success: false },
        { status: 400 },
      );
    }
    const { name } = body;

    // update db
    await prisma.user.update({
      where: { id: userId },
      data: { name: name },
    });

    return NextResponse.json(
      { message: "Name Updated", success: true },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
