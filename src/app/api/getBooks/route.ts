import { NextResponse } from "next/server";

export async function GET() {
  try {
    const genre = [
      "",
      "science",
      "psychology",
      "Fiction",
      "Romance",
      "Drama",
      "anime",
    ];
    const allData: any = await Promise.all(
      genre.map(async (q) => {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${q}&key=AIzaSyDFpeFtNdYLxa7FFf4E1wuES1m9T2xYyzw`
        );
        const data = await res.json();
        return data;
      })
    );

    return NextResponse.json(
      {
        data: allData,
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
