import { parseCSVAndInsert } from './utils/csvParser.js';

const filePath = '/app/data/Mobile_Food_Facility_Permit.csv';

await parseCSVAndInsert(filePath);
