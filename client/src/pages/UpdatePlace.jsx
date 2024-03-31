import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AddPlaceInputText } from "../components/formComponents";
import toast from "react-hot-toast";

export default function UpdatePlace() {
  const { id } = useParams();
  const [property, setProperty] = useState({
    title: "",
    description: "",
    address: "",
    checkIn: "",
    checkOut: "",
    extraInfo: "",
    price: "",
  });

  useEffect(() => {
    async function fetchProperty() {
      const response = await axios.get(`property/${id}`);
      const data = response.data;

      // Ensure all fields are defined
      setProperty({
        title: data.title || "",
        description: data.description || "",
        address: data.address || "",
        checkIn: data.checkIn || "",
        checkOut: data.checkOut || "",
        extraInfo: data.extraInfo || "",
        price: data.price || "",
      });
    }
    fetchProperty();
  }, [id]);

  async function deleteProperty() {
    const response = await axios.delete(`property/delete/${id}`);
    if (response.status === 200) {
      console.log("Property deleted successfully");
      fetchProperties();
    } else {
      console.error("Failed to delete property:", response.data);
    }
  }

  function handleChange(e) {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  }

  async function updateProperty(e) {
    e.preventDefault();
    const response = await axios.put(`property/update/${id}`, property);
    if (response.status === 200) {
      toast.success("Property updated successfully");
    } else {
      toast.success("Property updated successfully");
    }
  }

  return (
    <div>
      <div className="my-6 font-semibold text-3xl">
        Hey there you can update your property here 🏠.
      </div>
      <form onSubmit={updateProperty} className="flex flex-col gap-4">
        <label className="updateLabel">
          Title:
          <div className="desc">Update your property title here</div>
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleChange}
            className="updateInputText"
          />
        </label>
        <label className="updateLabel">
          Address:
          <div className="desc">Update your property address here</div>
          <input
            type="text"
            name="address"
            value={property.address}
            onChange={handleChange}
            className="updateInputText"
          />
        </label>
        <label className="updateLabel">
          Description:
          <div className="desc">Update your property description here</div>
          <textarea
            name="description"
            value={property.description}
            onChange={handleChange}
            className="updateInputArea"
          />
        </label>
        <label className="updateLabel">
          Extra Info:
          <div className="desc">Update your property extra into here</div>
          <textarea
            type="text"
            name="extraInfo"
            value={property.extraInfo}
            onChange={handleChange}
            className="updateInputArea"
          />
        </label>

        <div className="flex justify-between gap-4">
          <label className="updateLabel w-full">
            Check In:
            <div className="desc">Update your check in time here</div>
            <input
              type="text"
              name="checkIn"
              value={property.checkIn}
              onChange={handleChange}
              className="updateInputText"
            />
          </label>
          <label className="updateLabel w-full">
            Check Out:
            <div className="desc">Update your check out time here</div>
            <input
              type="text"
              name="checkOut"
              value={property.checkOut}
              onChange={handleChange}
              className="updateInputText"
            />
          </label>
          <label className="updateLabel w-full">
            Price:
            <div className="desc">Update your property price here</div>
            <input
              type="text"
              name="price"
              value={property.price}
              onChange={handleChange}
              className="updateInputText"
            />
          </label>
        </div>
        <div className="w-3/4 mx-auto">
          <button type="submit" className="primary bg-accent">
            Update Property
          </button>
        </div>
      </form>

      <div className="w-3/4 mx-auto">
        <button className="primary bg-third" onClick={deleteProperty}>
          Delete Property
        </button>
      </div>
    </div>
  );
}
