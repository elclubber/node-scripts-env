import 'dotenv/config';
import { fetchToken } from './services/fetchToken.js';
import { readExcelFile } from './utils/readExcelFile.js';
import { getGMBData } from './services/getGMBData.js';

// Environment Configuration Validation
const validateEnv = () => {
  if (!process.env.API_URL || !process.env.PASSWORD) {
    console.error('Missing required environment variables: API_URL or PASSWORD');
    process.exit(1);
  }
};

// Main Function
const getToken = async () => {
  validateEnv();
  const { API_URL, PASSWORD } = process.env;
  return await fetchToken(API_URL, PASSWORD, 'totalenergies');
};

// Execute Functions Sequentially
const main = async () => {
  try {
    console.log("Fetching token...");
    const token = await fetchToken(process.env.API_URL, process.env.PASSWORD, 'totalenergies');
    if (token) {
      const implantCodes = readExcelFile(); // Extract Implant codes
      console.log("Fetching GMB data...");
      await getGMBData(implantCodes, token); // Fetch and log GMB data
    } else {
      console.error('Token retrieval failed. Exiting...');
    }
  } catch (error) {
    console.error('Error during execution:', error.message);
  }
};
main();
