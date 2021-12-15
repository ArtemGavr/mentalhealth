import axios from "../utils/axios";

export const addBlood = async data => {
    try {
      const  {values, analyzesId} = data;
        console.log(values, analyzesId);
      const response = await axios.post(`/api/blood/${analyzesId}`, values);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return error.response.data;
    }
  };