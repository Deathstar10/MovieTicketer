import Image from "next/image";
export default function MovieCard({
  name,
  movie_poster,
}: {
  name: string;
  movie_poster: string;
  movie_background: string;
  movie_length: number;
}) {
  return (
    <>
      <Image src={movie_poster} width={400} height={600} alt={name} />
    </>
  );
}
