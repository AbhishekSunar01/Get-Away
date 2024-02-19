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
      <div className="mt-12 flex justify-between flex-wrap gap-8">
        {properties.map((property) => (
          <Property key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
}
