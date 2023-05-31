import Image from "next/image";
export default function MovieCard({
  name,
  movie_poster,
}: {
  name: string;
  movie_poster: string;
}) {
  return (
    <div className="rounded-md w-3/5 mb-2 h-60 md:w-[224px] md:h-[336px]  overflow-hidden ">
      <Image
        src={movie_poster}
        width={400}
        height={600}
        alt={name}
        className="object-cover "
      />
    </div>
  );
}
