import axios from "../utils/axios";

export const getUserNotes = async () => {
    try {
      const response = await axios.get("/api/notes");
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  };

  export const addUserNote = async data => {
    try {
      const response = await axios.post("/api/notes", data);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return error.response.data;
    }
  };