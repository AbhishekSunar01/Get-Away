import axios from "axios";
import { useEffect, useState } from "react";
import Property from "../components/propertyComponents/Property";

export default function Index() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    axios
      .get("/properties")
      .then((response) => setProperties(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <div className="mt-12 grid grid-cols-3 gap-5 sm:gap-8 md:gap-16 lg:gap-16">
        {properties.map((property, index) => (
          <Property key={index} property={property} />
        ))}
      </div>
    </div>
  );
}
