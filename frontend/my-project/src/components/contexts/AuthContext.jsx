import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  console.log({children})



const [token, setToken] = useState(localStorage.getItem("token"));
const [is_superuser, setIs_superuser] = useState(
  JSON.parse(localStorage.getItem("admin") || "false")
);
const [is_staff, setIs_staff] = useState(
  JSON.parse(localStorage.getItem("emp") || "false")
);
const [public_id, setPublicId] = useState(
  localStorage.getItem("publicId")
);



  console.log("mt",public_id)
  const navigate = useNavigate();
  const login = (token, is_superuser,is_staff,public_id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(is_superuser)); // ✅
   localStorage.setItem("emp", JSON.stringify(is_staff));  
    localStorage.setItem("publicId",public_id)
    setToken(token);
    setIs_superuser(is_superuser);
    setIs_staff(is_staff);
    setPublicId(public_id)
    
  };

  
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
  localStorage.removeItem("emp");
  localStorage.removeItem("publicId");

  setToken(null);
  setIs_superuser(false);
  setIs_staff(false);
  setPublicId(null);
};



  return (
    <AuthContext.Provider value={{ token, is_superuser, login, logout,public_id,is_staff}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
