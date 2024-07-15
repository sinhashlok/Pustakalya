import { Decimal } from "@prisma/client/runtime/library";

export interface BOOK {
  eTag: string;
  id: string;
  title: string;
  subtitle: string;
  genreType: string;
  author: string;
  description: string;
  rating: Decimal;
  thumbnail: string;
  price: number;
}
