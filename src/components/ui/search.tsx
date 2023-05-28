"use client";

import { useState } from "react";

export default function Search() {
  const [movie, setMovieName] = useState("");
  return (
    <form className="w-2/5">
      <input
        type="text"
        placeholder="Search for Movies, Events, Plays, and Activities"
        autoComplete="false"
        className="rounded flex-auto w-full py-2 px-2 mx-3"
        value={movie}
        onChange={(e) => setMovieName(e.target.value)}
      />
    </form>
  );
}
