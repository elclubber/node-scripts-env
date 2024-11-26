import axios from 'axios';

export const fetchToken = async (apiUrl, password, name) => {
  try {
    const response = await axios.get(apiUrl, {
      headers: { password },
      params: { name },
    });

    if (response.status === 200) {
      console.log('Token retrieved:', response.data);
      return response.data;
    } else {
      throw new Error(`Unexpected response: ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      console.error(
        `Error fetching token: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      console.error('Error fetching token: No response received from server');
    } else {
      console.error(`Error fetching token: ${error.message}`);
    }
    process.exit(1);
  }
};
