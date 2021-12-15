import axios from "../utils/axios";

export const getUserIllness = async () => {
    try {
      const response = await axios.get("/api/patient-illness");
      console.log("data from patient illness")
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  };