import axios from "../utils/axios";

export const getCurrentParams = async () => {
    try {
      const response = await axios.get("/api/bodies/last");
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  };

  export const getUserParams = async () => {
    try {
      const response = await axios.get("/api/bodies");
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  };

export const getUserBodyParams = async () => {
  try {
    const response = await axios.get("/api/healthParams");
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

  export const addBodyParams = async data => {
    try {
      const response = await axios.post("/api/bodies", data);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return error.response.data;
    }
  };
