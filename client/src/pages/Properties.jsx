import axios from "axios";
import { useEffect, useState } from "react";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    axios
      .get("/properties")
      .then((response) => setProperties(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      {properties.map((property) => (
        <div key={property.id}>
          <h2>{property.title}</h2>
          <p>{property.description}</p>
          {property.Image &&
            property.Image.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Property ${property.title} Image ${index + 1}`}
              />
            ))}
        </div>
      ))}
    </div>
  );
}
