import axios from "../utils/axios";

export const getIllness = async () => {
    try {
      const response = await axios.get("/api/illness");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  };

  export const createIllnes = async data => {
    try {
      const { name, severity  } = data;
      const illness = {  name, severity };
      console.log(illness);
      const response = await axios.post("/api/illness", illness);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };


  export const deleteIllness = async items => {
    try {
        const illness = items[0];
      const response = await axios.delete(`/api/illness/${illness}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };