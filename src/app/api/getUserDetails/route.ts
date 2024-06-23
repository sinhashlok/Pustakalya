import prisma from "@/db";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Authorization Token
    const bearerToken = req.headers.get("authorization") || "";
    const token = bearerToken.split(" ").at(1) || "";
    const payload = await verifyJwtToken(token);
    const userId = payload?.payload?.userId || "";
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthenticated", success: false },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        id: true,
        name: true,
        email: true,
        dob: true,
        address: true,
      },
    });

    return NextResponse.json(
      { message: "user details found", success: true, data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
