-- CreateTable
CREATE TABLE "FoodTruckPermit" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "applicant" TEXT NOT NULL,
    "facility_type" TEXT NOT NULL,
    "location_desc" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "permit" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "food_items" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "schedule_url" TEXT,
    "approved_date" TIMESTAMP(3),
    "expiration_date" TIMESTAMP(3),
    "neighborhood" TEXT NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodTruckPermit_pkey" PRIMARY KEY ("id")
);
