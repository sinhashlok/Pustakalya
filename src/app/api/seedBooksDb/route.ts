import prisma from "@/db";
import { NextResponse } from "next/server";
import { booksData } from "@/utils/seed";

export async function POST(req: Request) {
  try {
    // const genre = [
    //   "science",
    //   "psychology",
    //   "fiction",
    //   "romance",
    //   "drama",
    //   "anime",
    //   "crime",
    //   "horror",
    //   "comedy",
    //   "history",
    // ];

    booksData.map(async (book) => {
      await prisma.books.create({
        data: {
          id: book.id,
          eTag: book.eTag,
          title: book.title,
          subtitle: book.subtitle,
          genreType: book.genreType,
          author: book.author,
          description: book.description,
          thumbnail: book.thumbnail,
          rating: book.rating,
          price: book.price,
        },
      });
    });

    return NextResponse.json(
      {
        message: "success",
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
