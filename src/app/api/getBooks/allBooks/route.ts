import prisma from "@/db";
import { BOOK } from "@/types/booksType";
import { verifyJwtToken } from "@/utils/jwtToken";
import { NextRequest, NextResponse } from "next/server";

interface GENRE {
  genre: string;
  books: BOOK[];
}

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

    let genre: GENRE[] = [
      { genre: "Science", books: [] },
      { genre: "Psychology", books: [] },
      { genre: "Fiction", books: [] },
      { genre: "Romance", books: [] },
      { genre: "Drama", books: [] },
      { genre: "Anime", books: [] },
      { genre: "Crime", books: [] },
      { genre: "Horror", books: [] },
      { genre: "Comedy", books: [] },
      { genre: "History", books: [] },
    ];

    const books: BOOK[] = await prisma.books.findMany({});
    books.map((book: BOOK) => {
      switch (book.genreType) {
        case "science":
          genre[0].books.push(book);
          break;
        case "psychology":
          genre[1].books.push(book);
          break;
        case "fiction":
          genre[2].books.push(book);
          break;
        case "romance":
          genre[3].books.push(book);
          break;
        case "drama":
          genre[4].books.push(book);
          break;
        case "anime":
          genre[5].books.push(book);
          break;
        case "crime":
          genre[6].books.push(book);
          break;
        case "horror":
          genre[7].books.push(book);
          break;
        case "comedy":
          genre[8].books.push(book);
          break;
        case "history":
          genre[9].books.push(book);
          break;
      }
    });

    return NextResponse.json(
      {
        message: "Found all books",
        success: true,
        data: genre,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
