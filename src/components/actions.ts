"use server";
import { prisma } from "@/lib/server";
 
export async function addItem(showId: number, movieId: number, theatreId: number) {
    // if the seat is already booked, don't double book it
    const data =  await prisma.booking.findFirst({
        where:{
            movie_date: new Date("2023-08-09 03:30:00+00"),
            movie_id: Number(movieId),
            theatre_id: Number(theatreId),
            user_id: 1,
            status: "paid"
        }
    })

    if(data){
        console.log("already booked");
        return;
    } 
    await prisma.booking.create({
        data: {
            movie_date: new Date("2023-08-09 03:30:00+00"),
            movie_id: Number(movieId),
            theatre_id: Number(theatreId),
            user_id: 1,
            status: "paid"
        }
    })
}