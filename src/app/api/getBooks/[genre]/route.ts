import prisma from "@/db";
import { BOOK } from "@/types/booksType";
import { authTokenUserId } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { genre: string } },
) {
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
    const genre = params.genre;

    const books: BOOK[] = await prisma.books.findMany({
      where: {
        genreType: genre,
      },
    });

    return NextResponse.json(
      {
        message: "Found books",
        success: true,
        genre: genre,
        books: books,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
