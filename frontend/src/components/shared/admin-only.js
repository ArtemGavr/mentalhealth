import { USER_ROLES } from "../../constants/user";

const user = JSON.parse(sessionStorage.getItem('user'))
const AdminOnly = ({children }) => {
  return user.patientWithEmail.roles.includes(USER_ROLES.admin) && <div>{children}</div>;
};

export default AdminOnly;