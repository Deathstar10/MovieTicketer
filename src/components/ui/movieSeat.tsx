"use client";

export default function MovieSeat({ seatNumber }: { seatNumber: number }) {
  function handleClick(seatNumber: number) {
    console.log(seatNumber);
  }

  return (
    <button
      onClick={() => handleClick(seatNumber)}
      className="w-8 h-8 p-2 m-2 bg-green-500 border-0 "
    >
      {seatNumber}
    </button>
  );
}
