"use client"

import { useState } from "react";
import Image from "next/image";
export default async function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 2; // Total number of slides
  
    const nextSlide = () => {
      setCurrentSlide((currentSlide + 1) % totalSlides);
    };
  
    const prevSlide = () => {
      setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
    };
  
    const goToSlide = (index: number) => {
      setCurrentSlide(index);
    };
    return(
        <>
        <div className="flex items-center overflow-x-scroll snap-x" aria-label="MovieTicketer offers">
          <button onClick={prevSlide} className="p-2 bg-blue-500 text-white rounded-full">Prev</button>
          <div className="flex snap-start">
            <figure className="snap-center">
              <Image src="/bms_offer.avif" alt="Offer 1" width={1240} height={298} priority={true} />
              <figcaption><a href="#" className="text-blue-500">Book 2 free Movie Tickets</a></figcaption>
            </figure>
            <figure className="snap-center">
              <Image src="/motogp_bms.avif" alt="Offer 2" width={1240} height={298} priority={true} />
              <figcaption><a href="#" className="text-blue-500">Book Tickets for MotoGP race</a></figcaption>
            </figure>
          </div>
          <button onClick={nextSlide} className="p-2 bg-blue-500 text-white rounded-full">Next</button>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          {[...Array(totalSlides)].map((_, i) => (
            <button
              key={i}
              className={`w-4 h-4 rounded-full ${i === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
        </>
    )
}