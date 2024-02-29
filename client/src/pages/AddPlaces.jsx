import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../util/UserContext";
import { Link } from "react-router-dom";
import AddPlaceInputText from "../components/formComponents/AddPlaceInputText";
import AddPlaceInputArea from "../components/formComponents/AddPlaceInputArea";
import toast from "react-hot-toast";
import AddPlaceCCP from "../components/formComponents/AddPlaceInputCCP";
import AddPlaceLabel from "../components/formComponents/AddPlaceLabel";

export default function AddPlaces() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="container text-center mt-20 text-3xl font-bold w-fit flex mx-auto border border-gray-300 py-20 px-12 rounded-xl shadow-lg flex-col text-white">
        <div className="">Please login to add a property</div>
        <Link to="/login" className="text-lg text-accent underline">
          Login
        </Link>
      </div>
    );
  }

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
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post("property/add", formData);
      console.log(response.data);
      toast.success("Property added successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding property");
    }
  };

  const handleImageChange = (event) => {
    setImages((prevImages) => [...prevImages, ...event.target.files]);
    setSelectedImages((prevImages) => [...prevImages, ...event.target.files]);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 md:mx-0 mx-5">
      <AddPlaceInputText
        title="Title"
        desc="Title from your place. Should be short and catchy as in advertisement"
        value={title}
        onchange={(e) => setTitle(e.target.value)}
      />

      <AddPlaceInputText
        title="Address"
        desc="Address to this place"
        value={address}
        onchange={(e) => setAddress(e.target.value)}
      />

      <AddPlaceInputArea
        title="Description"
        desc="Description of this place"
        value={description}
        onchange={(e) => setDescription(e.target.value)}
        required
      />

      <div className="inputContainer my-4">
        <AddPlaceLabel
          title="Images"
          desc="Add images of your place. At least 3 images are recommended."
        />
        <div>
          <input
            type="file"
            className="my-3 bg-gray-100 p-2 rounded-md"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>

        {selectedImages && selectedImages.length > 0 && (
          <div className="w-full border p-2 flex justify-start gap-2 rounded-lg">
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="w-[145px] h-[135px] rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url(${URL.createObjectURL(image)})`,
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      <AddPlaceInputArea
        title="Extra Info"
        desc="house rules, etc"
        value={extraInfo}
        onchange={(e) => setExtraInfo(e.target.value)}
      />

      <div>
        <div className="mb-4">
          <AddPlaceLabel
            title="Check in & out time"
            desc="Add check in and out times, remember to have a time window for cleaning the room between guests."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AddPlaceCCP
            label="Check in"
            id="checkIn"
            value={checkIn}
            onchange={(e) => setCheckIn(e.target.value)}
            type="time"
          />

          <AddPlaceCCP
            label="Check out"
            id="checkOut"
            value={checkOut}
            onchange={(e) => setCheckOut(e.target.value)}
            type="time"
          />

          <AddPlaceCCP
            label="Price"
            id="price"
            value={price}
            onchange={(e) => setPrice(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 w-full">
        <button
          type="submit"
          className="text-white !w-[50%] bg-accent mx-auto primary hover:bg-green-500"
        >
          Save
        </button>
      </div>
    </form>
  );
}
