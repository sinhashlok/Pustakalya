import prisma from "@/db";
import { updateAddressSchema } from "@/schema/updateDetails";
import { authTokenUserId } from "@/utils/jwtToken";
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
    const isValidData = updateAddressSchema.safeParse(body);
    if (!isValidData.success) {
      return NextResponse.json(
        { message: "Invalid data", success: false },
        { status: 400 },
      );
    }
    const { address } = body;

    // db update
    await prisma.user.update({
      where: { id: userId },
      data: { address: address },
    });

    return NextResponse.json(
      { message: "Address updated", success: true },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
