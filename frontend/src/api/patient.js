import axios from "../utils/axios";

export const authenticate = async user => {
    try {
       // sessionStorage.clear()
      const response = await axios.post("/api/patient/login", user);
      return response.data ;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

export const create = async data => {
    try {
      const { name, surname, age, sex,  password, email, doctorMail  } = data;
      sessionStorage.clear()
      const user = {  name, surname, age, sex,  password, email, doctorMail };
      console.log(user);
      const response = await axios.post("/api/patient", JSON.stringify(user));
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  export const update = async data => {
    try{
      const { surname, name,  password, mail, doctorMail, age, confirmPassword } = data.values;
      const {id} = data;
      console.log(id);
      const user = { surname, name,  password, mail, doctorMail, age, confirmPassword };
      const response = await axios.put(`/api/patient/${id}`, user);
      sessionStorage.clear();
      return response.data;
    }catch(error){

      throw new Error(error);
    }
  };

  export const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/patient");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  };

  export const deleteUser = async items => {
    try {
        const user = items[0];
      const response = await axios.delete(`/api/illness/${user}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };