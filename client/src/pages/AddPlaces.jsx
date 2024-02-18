// import React, { useState, useContext } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { UserContext } from "../util/UserContext";
// import { Link } from "react-router-dom";

// export default function AddPlaces() {
//   const [title, setTitle] = useState("");
//   const [address, setAddress] = useState("");
//   const [description, setDescription] = useState("");
//   const [extraInfo, setExtraInfo] = useState("");
//   const [pricePerNight, setPricePerNight] = useState("");
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [images, setImages] = useState([]);
//   const [selectedImages, setSelectedImages] = useState([]);

//   const { user } = useContext(UserContext);

//   if (!user) {
//     return (
//       <div className="text-center mt-20 text-3xl font-bold text-[#444] w-fit flex mx-auto border border-gray-300 py-16 px-12 rounded-xl bg-accent shadow-lg flex-col">
//         <div className="text-white">Please login to add a property</div>
//         <Link to="/login" className="text-[#333] text-lg underline">
//           Login
//         </Link>
//       </div>
//     );
//   }

//   const handleImageChange = (e) => {
//     for (let i = 0; i < e.target.files.length; i++) {
//       const file = e.target.files[i];
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         setSelectedImages([...selectedImages, reader.result]);
//         setImages([...images, file]);
//       };

//       if (file) {
//         reader.readAsDataURL(file);
//       }
//     }
//     // const file = e.target.files[0];
//     // const reader = new FileReader();

//     // reader.onloadend = () => {
//     //   setSelectedImages([...selectedImages, reader.result]);
//     //   setImages([...images, file]);
//     //   console.log(images);
//     // };

//     // if (file) {
//     //   reader.readAsDataURL(file);
//     // }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     //pricePerNight = parseInt(pricePerNight);
//     console.log(
//       title,
//       address,
//       description,
//       extraInfo,
//       pricePerNight,
//       checkIn,
//       checkOut
//     );
//     try {
//       const response = await axios.post("/property/add", {
//         title: title,
//         address: address,
//         description: description,
//         extraInfo: extraInfo,
//         price: pricePerNight,
//         checkIn: checkIn,
//         checkOut: checkOut,
//       });
//       console.log(response.data);
//       toast.success("Property added successfully");
//     } catch (error) {
//       console.error(error);
//       toast.error("An error occurred");
//     }
//   };

//   return (
//     <div className="mt-12">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         {/*/***this is for title */}
//         <div className="inputContainer">
//           <label className="inputContainerTitle">Title</label>
//           <div className="inputContainerInput">
//             <div>
//               Title from your place. Should be short and catchy as in
//               advertisement
//             </div>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>
//         </div>
//         {/* this is for address */}
//         <div className="inputContainer">
//           <label className="inputContainerTitle">Address</label>
//           <div className="inputContainerInput">
//             <div>Address to this place</div>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>
//         </div>
//         {/* this is for description */}
//         <div className="inputContainer">
//           <label className="inputContainerTitle">Description</label>
//           <div className="inputContainerInput">
//             <div>Description of this place</div>
//             <textarea
//               className="border rounded-2xl my-3 w-full outline-none py-2 px-3 h-32 text-lg"
//               type="text"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//         </div>
//         {/* this is for images */}
//         <div className="inputContainer">
//           <label className="inputContainerTitle">Images</label>
//           <div className="inputContainerInput">Add images here</div>
//           <div className="container mx-auto border rounded-2xl my-3 p-2">
//             <div className="flex justify-start gap-2">
//               {selectedImages.map((image, index) => (
//                 <div
//                   key={index}
//                   className="w-[145px] h-[135px] rounded-lg bg-cover bg-center"
//                   style={{ backgroundImage: `url(${image})` }}
//                 ></div>
//               ))}
//               <div className="w-[145px] h-[135px] flex justify-center items-center border-2 border-dashed border-gray-300 bg-gray-100 rounded-lg">
//                 <label className="cursor-pointer">
//                   <span className="text-center text-gray-500">Upload</span>
//                   <input
//                     type="file"
//                     className="hidden"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     multiple
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* this is for Extra info */}
//         <div className="inputContainer">
//           <label className="inputContainerTitle">Extra Info</label>
//           <div className="inputContainerInput">
//             <div>house rules, etc</div>
//             <textarea
//               className="border rounded-2xl w-full my-3 outline-none py-2 px-3 h-32 text-lg"
//               type="text"
//               value={extraInfo}
//               onChange={(e) => setExtraInfo(e.target.value)}
//             />
//           </div>
//         </div>
//         {/* this is for price */}
//         <div className="">
//           <div className="mb-4">
//             <h2 className="text-xl font-semibold">Check in & out time</h2>
//             <p className="text-sm text-gray-600 mt-1">
//               Add check in and out times, remember to have a time window for
//               cleaning the room between guests.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="flex flex-col">
//               <label htmlFor="checkIn" className="font-md">
//                 Check in
//               </label>
//               <input
//                 className="mt-3 rounded-md"
//                 type="time"
//                 id="checkIn"
//                 value={checkIn}
//                 onChange={(e) => setCheckIn(e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col">
//               <label htmlFor="checkOut" className="font-md">
//                 Check out
//               </label>
//               <input
//                 className="mt-3 rounded-md"
//                 type="time"
//                 id="checkOut"
//                 value={checkOut}
//                 onChange={(e) => setCheckOut(e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col">
//               <label htmlFor="pricePerNight" className="font-md">
//                 Price per night
//               </label>
//               <input
//                 className="mt-1 rounded-md"
//                 type="text"
//                 id="pricePerNight"
//                 value={pricePerNight}
//                 onChange={(e) => setPricePerNight(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="text-white !w-[50%] bg-accent mx-auto primary hover:bg-green-500"
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";

export default function AddPlaces() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("checkIn", checkIn);
    formData.append("checkOut", checkOut);
    formData.append("extraInfo", extraInfo);
    formData.append("price", price);
    formData.append("location", location);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post("property/add", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    setImages([...event.target.files]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        placeholder="Check In"
      />
      <input
        type="text"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        placeholder="Check Out"
      />
      <textarea
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
        placeholder="Extra Info"
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input type="file" multiple onChange={handleImageChange} />
      <button type="submit">Add Property</button>
    </form>
  );
}
