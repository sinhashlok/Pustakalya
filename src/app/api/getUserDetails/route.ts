import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Authorization Token
    const bearerToken = req.headers.get("authorization") || "";
    const token = bearerToken.split(" ").at(1) || "";
    const payload = await verifyJwtToken(token);
    const userId = payload?.payload?.userId || "";

    

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }

}
