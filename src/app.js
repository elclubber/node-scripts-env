import 'dotenv/config';
import { fetchToken } from './services/fetchToken.js';
import { readExcelFile } from './utils/readExcelFile.js';
import { getGMBData } from './services/getGMBData.js';
import { writeToJsonFile } from './utils/writeToJsonFile.js';
import { processGMBData } from './utils/processGMBData.js';

// Environment Configuration Validation
const validateEnv = () => {
  if (!process.env.API_URL || !process.env.PASSWORD) {
    console.error('Missing required environment variables: API_URL or PASSWORD');
    process.exit(1);
  }
};

// Main Function
const main = async () => {
  try {
    console.log("Fetching token...");
    const token = await fetchToken(process.env.API_URL, process.env.PASSWORD, 'totalenergies');
    if (token) {
      const implantCodes = readExcelFile(); // Extract Implant codes
      console.log("Fetching GMB data...");
      const gmbData = await getGMBData(implantCodes, token); // Fetch and log GMB data
      
      // Save GMB data to a JSON file
      console.log("Saving raw GMB data to JSON...");
      writeToJsonFile(gmbData, 'gmbData.json');

      // Process GMB data
      console.log("Processing GMB data...");
      processGMBData();
    } else {
      console.error('Token retrieval failed. Exiting...');
    }
  } catch (error) {
    console.error('Error during execution:', error.message);
  }
};

main();
