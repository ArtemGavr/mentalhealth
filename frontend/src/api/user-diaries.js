import axios from "../utils/axios";

export const getUserDiaries = async () => {
    try {
      const response = await axios.get("/api/diaries");
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  };

  export const addUserDiary = async data => {
    try {
      const response = await axios.post("/api/diaries", data);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return error.response.data;
    }
  };

export const getUserDiariesLast = async data => {
  try {
    const response = await axios.get("/api/diaries/last", data);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};