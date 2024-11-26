import axios from "axios";
import pLimit from "p-limit";

const CONCURRENCY_LIMIT = 5;

export const getGMBData = async (implantCodes, token) => {
  try {
    const limit = pLimit(CONCURRENCY_LIMIT);

    // Function to fetch data for a single implant code
    const fetchData = async (code) => {
        const baseURL = `https://mybusiness.googleapis.com/v1/accounts/115784067469111955177/locations`;
        const params = {
          readMask: "title,name,regularHours,phoneNumbers,storefrontAddress,websiteUri,latlng,openInfo,profile,metadata,serviceArea,languageCode,storeCode",
          access_token: token.token,
          pageSize: 100,
          filter: `storeCode=${code}`, // Dynamically use the implant code
        };
        // Construct full URL with query parameters
        const fullURL = `${baseURL}?${new URLSearchParams(params).toString()}`;
      
        // Make the API request
        const response = await axios.get(fullURL);

        console.log(`Response for Implant Code ${code}:`, response.data);
        return response.data;
      };


    // Fetch data for all implant codes with concurrency limit
    const results = await Promise.all(
      implantCodes.map((code) => fetchData(code))
    );
    
    console.log("All data fetched successfully:", results);
    return results;
  } catch (error) {
    console.error("Error fetching data from GMB API:", error);

    // Optional: Throw the error to handle it in the calling function
    throw error;
  }
};
