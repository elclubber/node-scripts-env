import fs from 'fs';
import path from 'path';

export const writeToJsonFile = (data, fileName) => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Data successfully written to ${filePath}`);
  } catch (error) {
    console.error('Error writing to JSON file:', error.message);
    throw error;
  }
};
