-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "booking" (
    "booking_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "booking_date" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "movie_id" BIGINT,
    "theatre_id" BIGINT,
    "show_id" BIGINT,
    "user_id" BIGINT,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone_number" SMALLINT,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" BIGSERIAL NOT NULL,
    "inserted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "movie_length" SMALLINT,
    "rating" SMALLINT,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shows" (
    "show_id" BIGSERIAL NOT NULL,
    "seat_id" BIGINT NOT NULL,
    "screen_id" BIGINT NOT NULL,
    "theatre_id" BIGINT,
    "inserted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "name" TEXT,

    CONSTRAINT "shows_pkey" PRIMARY KEY ("show_id")
);

-- CreateTable
CREATE TABLE "theatre" (
    "id" BIGSERIAL NOT NULL,
    "inserted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "name" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "theatre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shows_seat_id_screen_id_theatre_id_key" ON "shows"("seat_id", "screen_id", "theatre_id");

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "shows"("show_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_theatre_id_fkey" FOREIGN KEY ("theatre_id") REFERENCES "theatre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shows" ADD CONSTRAINT "shows_theatre_id_fkey" FOREIGN KEY ("theatre_id") REFERENCES "theatre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

