import axios from "../utils/axios";

export const addMental = async data => {
    try {
      const  {values, diariesId} = data;
        console.log(values, diariesId);
      const response = await axios.post(`/api/moods/${diariesId}`, values);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return error.response.data;
    }
  };