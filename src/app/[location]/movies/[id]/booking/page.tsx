import { prisma } from "@/lib/server";
import { randomUUID } from "crypto";
import Link from "next/link";
interface theatreData {
  id: number;
  inserted_at: Date;
  updated_at: Date;
  name: string;
  longitude: number;
  latitude: number;
  location_id: number;
  screen_id: number;
  theatre_id: number;
  seats: number;
  movie_id: number;
  show_id: number;
  timeSlot: Date;
}
async function getTheatres(movieId: number, movieLocation: string) {
  // console.log(movieId, movieLocation);

  const theatres: theatreData[] = await prisma.$queryRaw`
    select theatre.*, shows.* from theatre 
    join locations on locations.id = theatre.location_id
    join movie_locations on movie_locations.location_id = theatre.location_id
    join shows on shows.theatre_id = theatre.id
    where locations.name = ${movieLocation.toLowerCase()} and movie_locations.movie_id = ${movieId}::bigint and shows.movie_id = ${movieId}::bigint
  `;

  // console.log(theatres);

  return theatres;
}

function ShowTimeSlots({
  theatres,
  userLocation,
  movieId,
}: {
  theatres: theatreData[];
  userLocation: string;
  movieId: number;
}) {
  return theatres.map((theatre) => (
    <div className="flex gap-2" key={randomUUID()}>
      <Link
        href={`/${userLocation}/movies/${movieId}/booking/seatLayout/${theatre.id}`}
        prefetch={false}
      >
        {theatre?.timeSlot &&
          theatre.timeSlot.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
      </Link>
      <p>{theatre.screen_id}</p>
    </div>
  ));
}

export default async function Booking({
  params,
}: {
  params: { id: number; location: string };
}) {
  const theatres = await getTheatres(params.id, params.location);

  if (!theatres) return <p>No theatres available</p>;
  var screens = new Set();

  var distinctTheatres: Record<number, theatreData[]> = {};
  theatres.forEach((theatre, index) => {
    if (screens.has(theatre.id)) {
      distinctTheatres[theatre.id].push(theatre);
    } else {
      screens.add(theatre.id);
      distinctTheatres[theatre.id] = [theatre];
    }
  });

  let shows = [];

  for (const [key, value] of Object.entries(distinctTheatres)) {
    shows.push(value);
  }

  return (
    <>
      {shows.map((theatres, index) => {
        return (
          <>
            <p key={theatres[index].screen_id}>{theatres[index].name}</p>
            {/* @ts-expect-error Server Component */}
            <ShowTimeSlots
              theatres={theatres}
              userLocation={params.location}
              movieId={params.id}
            />
          </>
        );
      })}
    </>
  );
}
