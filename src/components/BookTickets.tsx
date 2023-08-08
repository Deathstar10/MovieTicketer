"use client";
import { useState } from "react";
import { addItem } from "./actions";
export default function BookTickets({ showId, movieId, theatreId }: any) {
  const [currentSeat, setCurrentSeat] = useState(0);
  return (
    <form action={() => addItem(showId, movieId, theatreId)}>
      <button type="submit" className="bg-green-500 w-8 h-8">
        2
      </button>
    </form>
  );
}
