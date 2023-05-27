import Header from "@/components/header";
import MovieCard from "@/components/Moviecard";
import { prisma } from "../lib/server";
import Link from "next/link";
import Image from "next/image";
import { randomUUID } from "crypto";
async function getMovies() {
  const movies = await prisma.movies.findMany({
    take: 10,
  });

  return movies;
}
export default async function Home() {
  const movies = await getMovies();
  return (
    <>
      <Header />
      <main>
        <div className="w-4/5 mx-auto py-4">
          <Image
            src="bms_offer.avif"
            alt="Bookmyshow offer indicating 2 free Movie tickets upon conditions"
            className="object-cover"
          />
        </div>
        <section>
          <div className="flex gap-4 ">
            {movies.map((movie) => (
              <Link href={`movies/${movie.id}`} key={randomUUID()}>
                <MovieCard
                  name={movie.name}
                  movie_poster={movie.movie_poster}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
