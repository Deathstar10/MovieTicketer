import MovieCard from "@/components/Moviecard";
import { prisma } from "../../lib/server";
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
export default async function Home({
  params,
}: {
  params: { location: string };
}) {
  const movies = await getMovies(params.location);
  return (
    <>
      <main>
        <div
          className="grid grid-cols-[carousel-gutter_1fr_carousel-gutter] grid-rows-[1fr_32px] focus-visible:outline-offset-[-5px]"
          aria-label="MovieTicketer offers"
        >
          <div
            className="grid row-span-1 col-span-full auto-cols-[100%] grid-flow-col items-center
          gap-carousel_gutter px-4 overflow-x-auto overscroll-x-auto snap-x snap-mandatory scroll-px-carousel-scrollbar-gutter  no-scrollbar"
          >
            <div className="snap-center">
              <figure>
                <Image
                  src="/bms_offer.avif"
                  alt="Bookmyshow offer indicating 2 free Movie tickets upon conditions"
                  className="object-cover"
                  width={1240}
                  height={298}
                  priority={true}
                />
                <figcaption className="sr-only">
                  <a href="#">Book 2 free Movie Tickets</a>
                </figcaption>
              </figure>
            </div>
            <div className="snap-center">
              <figure>
                <Image
                  src="/motogp_bms.avif"
                  alt="Bookmyshow offer indicating 2 free Movie tickets upon conditions"
                  className="object-cover"
                  width={1240}
                  height={298}
                  priority={true}
                />
                <figcaption className="sr-only">
                  <a href="#">Book Tickets for MotoGP race</a>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
        <Suspense>
          <section>
            <div className="flex flex-col mx-auto justify-center max-w-md max-h-full   md:max-w-full gap-2 md:gap-6 md:flex-row  md:justify-start ml-4 ">
              {movies.map((movie) => (
                <Link
                  href={`${params.location}/movies/${movie.id}`}
                  key={randomUUID()}
                >
                  <MovieCard
                    name={movie.name}
                    movie_poster={movie.movie_poster}
                  />
                </Link>
              ))}
            </div>
          </section>
        </Suspense>
      </main>
    </>
  );
}
