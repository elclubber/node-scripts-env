import path from 'path';
import xlsx from 'xlsx';

const filePath = path.join(process.cwd(), 'src', 'data', 'listeStationsRéseau_Corse.xlsx');

export const readExcelFile = () => {
    try {
      const workbook = xlsx.readFile(filePath); // Read the file
      const sheetNames = workbook.SheetNames; // Get sheet names
      const firstSheet = workbook.Sheets[sheetNames[0]]; // Select the first sheet
  
      // Convert sheet data to JSON
      const data = xlsx.utils.sheet_to_json(firstSheet);
  
      // Values to remove
      const valuesToRemove = ['50 stations ', 'Avitaillements :3', 'SPO : 8', 'RM : 39'];
  
      // Extract and filter the "Implant" column
      const implantValues = data
        .map((row) => row["Implant"]) // Extract "Implant" values
        .filter((value) => value !== undefined && !valuesToRemove.includes(value)); // Remove unwanted values
  
    //   console.log('Filtered Implant Column Values:', implantValues);
      return implantValues;
    } catch (error) {
      console.error('Error reading Excel file:', error.message);
      throw error;
    }
  };
  