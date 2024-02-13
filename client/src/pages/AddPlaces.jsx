import React, { useState } from "react";

export default function AddPlaces() {
  const isAuth = true;
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImages([...images, reader.result]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-12">
      <form className="flex flex-col gap-2">
        {/*/***this is for title */}
        <div className="inputContainer">
          <label className="inputContainerTitle">Title</label>
          <div className="inputContainerInput">
            <div>
              Title from your place. Should be short and catchy as in
              advertisement
            </div>
            <input type="text" />
          </div>
        </div>
        {/* this is for address */}
        <div className="inputContainer">
          <label className="inputContainerTitle">Address</label>
          <div className="inputContainerInput">
            <div>Address to this place</div>
            <input type="text" />
          </div>
        </div>
        {/* this is for description */}
        <div className="inputContainer">
          <label className="inputContainerTitle">Description</label>
          <div className="inputContainerInput">
            <div>Description of this place</div>
            <textarea
              className="border rounded-2xl my-3 w-full outline-none py-2 px-3 h-32 text-lg"
              type="text"
            />
          </div>
        </div>
        {/* this is for images */}
        <div className="inputContainer">
          <label className="inputContainerTitle">Images</label>
          <div className="inputContainerInput">Add images here</div>
          <div className="container mx-auto border rounded-2xl my-3 p-2">
            <div className="flex justify-start gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-[145px] h-[135px] rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              ))}
              <div className="w-[145px] h-[135px] flex justify-center items-center border-2 border-dashed border-gray-300 bg-gray-100 rounded-lg">
                <label className="cursor-pointer">
                  <span className="text-center text-gray-500">Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* this is for Extra info */}
        <div className="inputContainer">
          <label className="inputContainerTitle">Extra Info</label>
          <div className="inputContainerInput">
            <div>house rules, etc</div>
            <textarea
              className="border rounded-2xl w-full my-3 outline-none py-2 px-3 h-32 text-lg"
              type="text"
            />
          </div>
        </div>
        {/* this is for price */}
        <div className="">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Check in & out time</h2>
            <p className="text-sm text-gray-600 mt-1">
              Add check in and out times, remember to have a time window for
              cleaning the room between guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="checkIn" className="font-md">
                Check in
              </label>
              <input type="time" id="checkIn" className="mt-3 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="checkOut" className="font-md">
                Check out
              </label>
              <input type="time" id="checkOut" className="mt-3 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="pricePerNight" className="font-md">
                Price per night
              </label>
              <input
                type="text"
                id="pricePerNight"
                className="mt-1 rounded-md"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="text-white !w-[50%] bg-accent mx-auto primary hover:bg-green-500"
        >
          Save
        </button>
      </form>
    </div>
  );
}
