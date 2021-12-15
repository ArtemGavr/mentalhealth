import axios from "../utils/axios";

export const getResults = async () => {
    try {
      const response = await axios.get("/api/results");
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  };