import axios from "../utils/axios";

export const addAnalyzes = async data => {
    try {
      const response = await axios.post("/api/analyzes", data);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return error.response.data;
    }
  };

  export const getLastAnalyzes = async () => {
    try {
      const response = await axios.get("/api/analyzes/last");
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  };