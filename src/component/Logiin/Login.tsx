import  { useContext } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContext/AuthContext";
export default function Login() {
  interface LoginFormInput{
    username:string,
    password:string
  }
  interface AuthContextType{
    saveData:()=>void;
  }
 const {register , handleSubmit ,formState:{errors} } = useForm<LoginFormInput>();
 const navigate = useNavigate();
 const {saveData} = useContext(AuthContext) as AuthContextType;
 //integrate and submit data with api
 const onSubmitData = async (data:LoginFormInput)=>{
try {
  const response  = await axios.post("https://dummyjson.com/auth/login" , data);
  console.log(response);
  toast.success("Login Successfully!");
  localStorage.setItem("userToken",response?.data?.accessToken);
  saveData();
  navigate("/dashboard")
} catch (error) {
  toast.error("Login Failed!");
  console.log(error);
  
}
 
 }
  return (
    <div className="container-fluid login_container">
      <div className="row  vh-100 ">
        <div className="col-md-4">
          <div className="bg-white rounded p-4 ">
            <div className="formInfo text-center py-4">
              <h1 className="formInfoTitle">user mangement system</h1>
              <p className="formInfoDesc">sign in</p>
              <small className="formInfoSmall">
                Enter your credentials to access your account
              </small>
            </div>
            <div className="formContent">
              <form  onSubmit={handleSubmit(onSubmitData)}>
                <label htmlFor="formUsername" className="formEmailLabel">
                  username
                </label>
                <input
                  type="text"
                  className="emailInput form-control "
                  placeholder="Enter Your Username"
                  autoComplete="off"
                  id="formUsername"
                  {...register("username" , {required:"username Is required"})}
                />
                {errors.username && <span className="text-danger"> {errors.username.message} </span>}
                <label htmlFor="formPassword" className="formPasswordLabel">
                  Password
                </label>
                <input
                  type="password"
                  className="passwordInput form-control "
                  placeholder="Enter Your Password"
                  autoComplete="off"
                  id="formPassword"
                  {...register("password" , {required:"password is required"})}
                />
                {errors.password && <span className="text-danger">{errors.password.message}</span>}

                <button className="btn btn-warning w-100 py-2 my-4 text-white formBtn">sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
