import BookTickets from "@/components/BookTickets";
export default async function SeatLayout({
  params,
}: {
  params: { id: number; location: string; theatre: number };
}) {
  return (
    <BookTickets show_id={1} movieId={params.id} theatreId={params.theatre} />
  );
}
