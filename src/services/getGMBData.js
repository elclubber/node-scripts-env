import axios from 'axios';
import pLimit from 'p-limit';

const CONCURRENCY_LIMIT = 5; // Adjust based on API rate limits

export const getGMBData = async (implantCodes) => {
  try {
    const limit = pLimit(CONCURRENCY_LIMIT);

    const fetchData = async (code) => {
      const url = `https://mybusiness.googleapis.com/v1/account/${code}`; // to update accordingly
      const response = await axios.get(url);
      console.log(`Response for Implant Code ${code}:`, response.data);
      return response.data;
    };

    const results = await Promise.all(
      implantCodes.map((code) => limit(() => fetchData(code)))
    );

    console.log('All data fetched successfully.');
    return results;
  } catch (error) {
    console.error('Error fetching data from GMB API:', error.message);
  }
};
