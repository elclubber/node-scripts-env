import fs from 'fs';
import path from 'path';

export const processGMBData = () => {
  try {
    // Path to the raw data file
    const inputFilePath = path.join(process.cwd(), 'src', 'data', 'gmbData.json');
    const outputFilePath = path.join(process.cwd(), 'src', 'data', 'processedGMBData.json');

    // Read and parse the raw data
    const rawData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));

    // Process data and add a new property
    const processedData = rawData.map((item) => ({
      ...item,
      locationGoogleId: 'accounts/115784067469111955177', // Add a placeholder property
      codeImplant: item.storeCode,
      canalDeVente: "Corse",
    //   nomDeSite: 
    }));

    // Save the processed data to a new file
    fs.writeFileSync(outputFilePath, JSON.stringify(processedData, null, 2), 'utf-8');
    console.log(`Processed data successfully written to ${outputFilePath}`);
  } catch (error) {
    console.error('Error processing GMB data:', error.message);
    throw error;
  }
};
