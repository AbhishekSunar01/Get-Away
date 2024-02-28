// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function Register() {
//   const [formValue, setFormValue] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {};

//     if (!formValue.name.trim()) {
//       newErrors.name = "Name is required";
//       valid = false;
//     }

//     if (!formValue.email.trim()) {
//       newErrors.email = "Email is required";
//       valid = false;
//     } else if (!/\S+@\S+\.\S+/.test(formValue.email)) {
//       newErrors.email = "Email is invalid";
//       valid = false;
//     }

//     if (!formValue.password.trim()) {
//       newErrors.password = "Password is required";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const createUser = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       await axios.post("user/register", formValue);
//       console.log("User has been created");
//       toast.success("Registered Succesfully!");

//       e.target.reset();
//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data.error);
//       } else {
//         toast.error(error.message);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="flex grow mt-12 items-center justify-around flex-col md:mx-[25%] px-5">
//         <h1 className="text-4xl text-center pt-8 pb-5">Register</h1>
//         <form className="w-full mx-auto" onSubmit={createUser}>
//           <input
//             type="text"
//             id="name"
//             placeholder={"your name"}
//             onChange={(e) => {
//               setFormValue({ ...formValue, name: e.target.value });
//             }}
//           />
//           {errors.name && <div className="error">{errors.name}</div>}

//           <input
//             type="email"
//             id="email"
//             placeholder={"your@email.com"}
//             onChange={(e) => {
//               setFormValue({ ...formValue, email: e.target.value });
//             }}
//           />
//           {errors.email && <div className="error">{errors.email}</div>}

//           <input
//             type="password"
//             id="password"
//             placeholder="password"
//             onChange={(e) => {
//               setFormValue({ ...formValue, password: e.target.value });
//             }}
//           />
//           {errors.password && <div className="error">{errors.password}</div>}

//           <button className="primary bg-primary hover:bg-purple-700">
//             Sign Up
//           </button>
//           <div className="text-center mt-4 text-gray-500">
//             Already have an account ?{" "}
//             <NavLink to="/login" className="text-black underline">
//               Login
//             </NavLink>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formValue.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formValue.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValue.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formValue.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const createUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("user/register", formValue);
      console.log("User has been created");
      toast.success("Registered Successfully!");

      // Reset form after successful registration
      setFormValue({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="flex grow mt-12 items-center justify-around flex-col md:mx-[25%] px-5">
        <h1 className="text-4xl text-center pt-8 pb-5">Register</h1>
        <form className="w-full mx-auto" onSubmit={createUser}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              placeholder={"Your name"}
              value={formValue.name}
              onChange={(e) => {
                setFormValue({ ...formValue, name: e.target.value });
                setErrors({ ...errors, name: "" });
              }}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder={"Your email"}
              value={formValue.email}
              onChange={(e) => {
                setFormValue({ ...formValue, email: e.target.value });
                setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="mb-2">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formValue.password}
              onChange={(e) => {
                setFormValue({ ...formValue, password: e.target.value });
                setErrors({ ...errors, password: "" });
              }}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <button className="primary bg-primary hover:bg-purple-700">
            Sign Up
          </button>
          <div className="text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <NavLink to="/login" className="text-black underline">
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
}
