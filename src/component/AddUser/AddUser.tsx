import "./AddUser.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddUser() {
  const location = useLocation();
  const { action, user } = location.state || { action: null, user: null };

  
  interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    phone: string;
    birthDate: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      age: user?.age || undefined,
      phone: user?.phone ? user.phone.toString() : "", // Ensure phone is a string
      birthDate: user?.birthDate ? new Date(user.birthDate).toISOString().split("T")[0] : "",
    },
  });

  const navigate = useNavigate();

  const onSubmitData = async (data: UserFormData) => {
    try {
      if (action === "edit") {
        // Send edit request
        const response = await axios.put(`https://dummyjson.com/users/${user.id}`, data);
        console.log(response);
        toast.success("User updated successfully!");
      } else {
        // Send add request
        const response = await axios.post("https://dummyjson.com/users/add", data);
        console.log(response);
        toast.success("User added successfully!");
      }
      navigate("/dashboard/user-list");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to process user request.");
    }
  };

  return (
    <div className="addUserContainer">
      <div className="addUserInfo">
        <h3 className="adduserInfoTitle">
          {action === "edit" ? "Edit User" : "Add User"}
        </h3>
        <hr />
      </div>
      <div className="addUserFormContent m-4">
        <form onSubmit={handleSubmit(onSubmitData)} className="shadow-lg p-4">
          <div className="row">
            <div className="col-md-6 my-2">
              <label htmlFor="firstname" className="firstNamelabel my-2">
                First Name
              </label>
              <input
                type="text"
                className="firstNameInput form-control"
                id="firstname"
                placeholder="Enter Your First Name"
                autoComplete="off"
                {...register("firstName", {
                  required: "First name is required!",
                })}
              />
              {errors.firstName && (
                <span className="text-danger">{errors.firstName.message}</span>
              )}
            </div>
            <div className="col-md-6 my-2">
              <label htmlFor="lastname" className="firstNamelabel my-2">
                Last Name
              </label>
              <input
                type="text"
                className="lastNameInput form-control"
                id="lastname"
                placeholder="Enter Your Last Name"
                autoComplete="off"
                {...register("lastName", {
                  required: "Last name is required!",
                })}
              />
              {errors.lastName && (
                <span className="text-danger">{errors.lastName.message}</span>
              )}
            </div>
            <div className="col-md-6 my-2">
              <label htmlFor="emailLabel" className="firstNamelabel my-2">
                Email
              </label>
              <input
                type="email"
                className="lastNameInput form-control"
                id="emailLabel"
                placeholder="Enter Your Email"
                autoComplete="off"
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email address!",
                  },
                })}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>
            <div className="col-md-6 my-2">
              <label htmlFor="ageLabel" className="firstNamelabel my-2">
                Age
              </label>
              <input
                type="number"
                className="lastNameInput form-control"
                id="ageLabel"
                placeholder="Enter Your Age"
                autoComplete="off"
                {...register("age", {
                  required: "Age is required!",
                  min: {
                    value: 1,
                    message: "Age must be greater than 0!",
                  },
                })}
              />
              {errors.age && (
                <span className="text-danger">{errors.age.message}</span>
              )}
            </div>
            <div className="col-md-6 my-2">
              <label htmlFor="phoneLabel" className="firstNamelabel my-2">
                Phone Number
              </label>
              <input
                type="text"
                className="lastNameInput form-control"
                id="phoneLabel"
                placeholder="Enter Your Phone Number"
                autoComplete="off"
                {...register("phone", {
                  required: "Phone number is required!",
                })}
              />
              {errors.phone && (
                <span className="text-danger">{errors.phone.message}</span>
              )}
            </div>
            <div className="col-md-6 my-2">
              <label htmlFor="birthdateLabel" className="firstNamelabel my-2">
                Birth Date
              </label>
              <input
                type="date"
                className="lastNameInput form-control"
                id="birthdateLabel"
                placeholder="Enter Your Birth Date"
                autoComplete="off"
                {...register("birthDate", {
                  required: "Birth date is required!",
                })}
              />
              {errors.birthDate && (
                <span className="text-danger">{errors.birthDate.message}</span>
              )}
            </div>
            <button className="btn btn-warning w-50 text-white py-2 my-4">
              {action === "edit" ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
