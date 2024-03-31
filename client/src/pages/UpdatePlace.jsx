import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function UpdatePlace() {
  const { id } = useParams();
  const [property, setProperty] = useState({
    name: "",
    description: "",
    address: "",
    checkIn: "",
    checkOut: "",
    extraInfo: "",
    price: "",
    images: [],
  });

  useEffect(() => {
    async function fetchProperty() {
      const response = await axios.get(`property/${id}`);
      const data = response.data;

      // Ensure all fields are defined
      setProperty({
        name: data.name || "",
        description: data.description || "",
        address: data.address || "",
        checkIn: data.checkIn || "",
        checkOut: data.checkOut || "",
        extraInfo: data.extraInfo || "",
        price: data.price || "",
        images: data.images || [],
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
      console.log("Property updated successfully");
    } else {
      console.error("Failed to update property:", response.data);
    }
  }

  return (
    <div>
      <h1>Update Place</h1>

      <form onSubmit={updateProperty}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={property.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={property.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Check In:
          <input
            type="text"
            name="checkIn"
            value={property.checkIn}
            onChange={handleChange}
          />
        </label>
        <label>
          Check Out:
          <input
            type="text"
            name="checkOut"
            value={property.checkOut}
            onChange={handleChange}
          />
        </label>
        <label>
          Extra Info:
          <input
            type="text"
            name="extraInfo"
            value={property.extraInfo}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={property.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Images:
          <input type="file" name="images" multiple />
        </label>
        <div>
          {property.images &&
            property.images.map((image, index) => (
              <img key={index} src={image.url} alt={image.alt} />
            ))}
        </div>
        <br />
        <br />
        <button type="submit">Update Property</button>
      </form>

      <button onClick={deleteProperty}>Delete Property</button>
    </div>
  );
}
