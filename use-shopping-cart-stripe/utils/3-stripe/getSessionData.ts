// Axios
import axios from "axios";

// Session Data Retrieve function
export const getSessionData = async (sessionUrl: string) => {
  try {
    const sessionData = await axios.get(sessionUrl);
    return sessionData;
  } catch (error) {
    console.error(error);
  }
};
