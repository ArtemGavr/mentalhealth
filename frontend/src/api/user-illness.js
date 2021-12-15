import axios from "../utils/axios";

export const getUserIllness = async () => {
    try {
      const response = await axios.get("/api/user-illness");
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  };