import { prisma } from "../../../lib/server";
import { UUID, randomUUID } from "crypto";
async function getData(id: number) {
  const movies = await prisma.movies.findMany();

  return movies;
}

export default async function Page({ params }: { params: { id: number } }) {
  const data = await getData(params.id);
  return (
    <>
      {data.map((movie) => {
        return (
          <p key={randomUUID()}>
            {movie.name} {movie.description}
          </p>
        );
      })}
    </>
  );
}
