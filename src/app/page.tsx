import MovieCard from "@/components/Moviecard";
import { prisma } from "../lib/server";
import Link from "next/link";
import Image from "next/image";
import { randomUUID } from "crypto";
import { Suspense } from "react";

interface movie {
  id: number;
  inserted_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  movie_length: number;
  rating: number;
  movie_poster: string;
  movie_background_poster: string;
}

async function getMovies(userLocation: string) {
  const movies: movie[] = await prisma.$queryRaw`
    select movies.*
    from
    movies
    join movie_locations on movie_locations.movie_id = movies.id
    join locations on locations.id = movie_locations.location_id
  where
  locations.name = ${userLocation.toLowerCase()};
  `;
  return movies;
}
export default async function Home() {
  const movies = await getMovies("hyderabad");
  return (
    <>
      <main>
        <div className="w-4/5 mx-auto py-4">
          <Image
            src="/bms_offer.avif"
            alt="Bookmyshow offer indicating 2 free Movie tickets upon conditions"
            className="object-cover"
            width={1240}
            height={298}
            priority={true}
          />
        </div>
        <Suspense>
          <section>
            <div className="max-w-md mx-auto  md:max-w-full gap-2 md:flex md:justify-center ">
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
        </Suspense>

        <p>hello footer</p>
      </main>
    </>
  );
}
