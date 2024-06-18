import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/utils/jwtToken";
import prisma from "@/db";

export async function POST(req: NextRequest) {
  try {
    // Authorization Token
    console.log(req.headers);

    const bearerToken = req.headers.get("authorization") || "";
    const token = bearerToken.split(" ").at(1) || "";
    const payload = await verifyJwtToken(token);
    const userId = payload?.payload?.userId || "";

    const body = await req.json();
    console.log(body);

    const { code }: { code: string } = body;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
        verifyToken: code,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Incorret token", success: false },
        { status: 404 }
      );
    }

    await prisma.user.update({
      where: {
        id: userId,
        verifyToken: code,
      },
      data: {
        verifyToken: null,
        isVerified: true,
      },
    });

    return NextResponse.json(
      { message: "Verified Successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
