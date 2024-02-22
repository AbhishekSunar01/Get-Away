import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/property/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Failed to fetch property", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-14 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-4xl">{property.title}</h1>
        <div className="flex gap-2 items-center font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              clipRule="evenodd"
            />
          </svg>

          <span>{property.address}</span>
        </div>
      </div>

      <div className="flex justify-between w-full h-[550px] rounded-2xl overflow-hidden">
        <div
          className="w-[50%] "
          style={{
            backgroundImage: `url(${
              property.Image && property.Image.length > 0
                ? property.Image[0].url
                : "defaultImageUrl"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",

            width: "50%",
            height: "100%",
          }}
        ></div>
        <div className="w-[49%] flex flex-col justify-between">
          <div
            className="w-full h-[45%]"
            style={{
              backgroundImage: `url(${
                property.Image && property.Image.length > 0
                  ? property.Image[1].url
                  : "defaultImageUrl"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",

              width: "100%",
              height: "49%",
            }}
          ></div>

          <div
            className="w-full h-[49%]"
            style={{
              backgroundImage: `url(${
                property.Image && property.Image.length > 0
                  ? property.Image[2].url
                  : "defaultImageUrl"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",

              width: "100%",
              height: "49%",
            }}
          ></div>
        </div>
      </div>

      <div className="flex w-full justify-between h-[330px]">
        <div className="w-[52%] overflow-y-auto scrollbar-hide">
          <h1 className="font-semibold text-2xl mb-2">Description</h1>
          <p>{property.description}</p>
        </div>

        <div className="w-[45%] shadow-lg bg-gray-100 font-semibold rounded-2xl py-5 px-4 flex flex-col gap-4">
          <h1 className=" text-xl text-center">
            Price: Rs{property.price} per night
          </h1>

          <div className="flex flex-col gap-2">
            <label>Check In:</label>
            <input type="date" />
          </div>

          <div className="flex flex-col gap-2">
            <label>Check In:</label>
            <input type="date" />
          </div>

          <button className="primary">Book this place</button>
        </div>
      </div>

      <div className="w-full bg-gray-100 px-28 shadow-lg py-6 rounded-2xl">
        <h1 className="text-3xl font-semibold">Extra Info</h1>
        <p>{property.extraInfo}</p>
      </div>
    </div>
  );
}
