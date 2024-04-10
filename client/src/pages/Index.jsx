// import axios from "axios";
// import { useEffect, useState } from "react";
// import Property from "../components/propertyComponents/Property";
// import { SearchContext } from "../util/SearchContext";
// import { useContext } from "react";

// export default function Index() {
//   const { isSearchVisible } = useContext(SearchContext);

//   const [properties, setProperties] = useState([]);
//   useEffect(() => {
//     axios
//       .get("/properties")
//       .then((response) => setProperties(response.data))
//       .catch((error) => console.error("Error:", error));
//   }, []);

//   return (
//     <div>
//       {isSearchVisible && <div className="bg-gray-100 p-4">Search</div>}
//       <div className="mt-12 grid grid-cols-3 gap-5 sm:gap-8 md:gap-16 lg:gap-16">
//         {properties.map((property, index) => (
//           <Property key={index} property={property} />
//         ))}
//       </div>
//     </div>
//   );
// }
import axios from "axios";
import { useEffect, useState } from "react";
import Property from "../components/propertyComponents/Property";
import { SearchContext } from "../util/SearchContext";
import { useContext } from "react";

export default function Index() {
  const { isSearchVisible } = useContext(SearchContext);

  const [properties, setProperties] = useState([]);
  const [sortKey, setSortKey] = useState("price"); // default sort key
  const [searchTerm, setSearchTerm] = useState(""); // search term
  const [sortDirection, setSortDirection] = useState("asc"); // default sort

  {
    isSearchVisible && (
      <div className="bg-gray-100 p-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search properties..."
        />
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="price">Price</option>
          <option value="name">Name</option>
          <option value="address">Address</option>
        </select>
        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    );
  }

  useEffect(() => {
    axios
      .get("/properties")
      .then((response) => setProperties(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const sortProperties = (a, b) => {
    if (sortKey === "price") {
      return sortDirection === "asc"
        ? a[sortKey] - b[sortKey]
        : b[sortKey] - a[sortKey];
    } else {
      if (a[sortKey] < b[sortKey]) {
        return -1;
      }
      if (a[sortKey] > b[sortKey]) {
        return 1;
      }
      return 0;
    }
  };

  return (
    <div>
      {isSearchVisible && (
        <div className="flex items-center justify-center mt-4 gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="py-2 px-6 border border-gray-300 rounded-md w-full text-2xl"
          />

          <div className="flex gap-4 justify-end ">
            <select
              className="border border-gray-300 outline-none p-2 rounded-xl "
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option className="option" value="price">
                💵 Price
              </option>
              <option className="option" value="name">
                🏠 Name
              </option>
              <option className="option" value="address">
                📍 Address
              </option>
            </select>
            {sortKey === "price" && (
              <select
                className="border border-gray-300 outline-none p-2 rounded-xl "
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
              >
                <option className="option" value="asc">
                  ⬆️ Low to high
                </option>
                <option className="option" value="desc">
                  ⬇️ High to low
                </option>
              </select>
            )}
          </div>
        </div>
      )}
      <div className="mt-12 grid grid-cols-3 gap-5 sm:gap-8 md:gap-16 lg:gap-16">
        {properties
          .filter((property) =>
            Object.values(property).some((value) =>
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
          )
          .sort(sortProperties)
          .map((property, index) => (
            <Property key={index} property={property} />
          ))}
      </div>
    </div>
  );
}
