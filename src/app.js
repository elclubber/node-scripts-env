import 'dotenv/config';
import { fetchToken } from './services/fetchToken.js';
import { readExcelFile } from './utils/readExcelFile.js';

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

// Execute functions
readExcelFile();
getToken();
