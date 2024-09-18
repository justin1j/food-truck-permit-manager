import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';
import { Presets, SingleBar } from 'cli-progress';

const prisma = new PrismaClient();

export const parseCSVAndInsert = async (filePath: string) => {
  const results: any[] = [];

  if (await prisma.foodTruckPermit.count()) {
    return;
  }

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async (data) => {
      results.push(data);
    })
    .on('end', async () => {
      const bar = new SingleBar({}, Presets.legacy);
      bar.start(results.length, 0);
      for (const [index, row] of results.entries()) {
        try {
          await prisma.foodTruckPermit.create({
            data: {
              location_id: parseInt(row.locationid),
              applicant: row.Applicant,
              facility_type: row.FacilityType,
              location_desc: row.LocationDescription,
              address: row.Address,
              permit: row.permit,
              status: row.Status,
              food_items: row.FoodItems,
              latitude: parseFloat(row.Latitude),
              longitude: parseFloat(row.Longitude),
              schedule_url: row.Schedule,
              approved_date: row.Approved ? new Date(row.Approved) : null,
              expiration_date: row.ExpirationDate
                ? new Date(row.ExpirationDate)
                : null,
              neighborhood: row['Neighborhoods (old)'],
              zip_code: parseInt(row['Zip Codes']),
            },
          });
          bar.update(index + 1);
        } catch (error) {
          console.error(`Error inserting row: ${row.locationid}`, error);
        }
      }
      bar.stop();
      console.log('Data imported successfully!');
    });
};
