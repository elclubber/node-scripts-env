import path from 'path';
import xlsx from 'xlsx';

const filePath = path.join(process.cwd(), 'src', 'data', 'test.xls');

export const readExcelFile = () => {
  try {
    const workbook = xlsx.readFile(filePath); // Read the file
    const sheetNames = workbook.SheetNames; // Get sheet names
    const firstSheet = workbook.Sheets[sheetNames[0]]; // Select the first sheet

    // Convert sheet data to JSON
    const data = xlsx.utils.sheet_to_json(firstSheet);
    console.log('Excel File Content:', data);
    return data;
  } catch (error) {
    console.error('Error reading Excel file:', error.message);
    throw error;
  }
};
