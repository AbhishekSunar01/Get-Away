import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function BookingComponent({
  booking,
  handleDelete,
  initiatePayment,
}) {
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (popup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [popup]);

  const handlePopup = () => {
    setPopup(!popup);
  };

  const deleteBooking = (id) => {
    try {
      handleDelete(id);
      setPopup(false);
    } catch (error) {
      console.error("Error deleting booking", error);
      toast.error("An error occurred while deleting the booking");
    }
  };

  const handlePayment = (purchase_order_id, purchase_order_name, amount) => {
    try {
      initiatePayment(purchase_order_id, purchase_order_name, amount);
      setPopup(false);
    } catch (error) {
      console.error("Error initiating payment", error);
      toast.error("An error occurred while initiating payment");
    }
  };

  console.log(booking.Payment[0].status);

  return (
    <div
      onClick={handlePopup}
      className="w-full flex gap-4 border bg-background h-[250px] rounded-3xl overflow-hidden shadow-md hover:shadow-xl ease-linear transition-all duration-300 cursor-pointer "
      key={booking.id}
    >
      <div className="w-1/4 h-full">
        <img
          src={booking.property.Image[0].url}
          alt={booking.property.title}
          className="w-full rounded-l-md h-full object-cover"
        />
      </div>
      <div className="py-2 flex pl-6 flex-col h-full items-start justify-center gap-4 my-auto">
        <h2 className="text-4xl font-semibold">{booking.property.title}</h2>
        <div className="leading-tight text-xl font-medium text-[#777]">
          <p className="flex gap-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
            </span>
            Check-in: {new Date(booking.checkIn).toLocaleDateString()}{" "}
            <span className="pl-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
            </span>
            Check-out: {new Date(booking.checkOut).toLocaleDateString()}
          </p>
        </div>
        <div className="text-xl flex gap-2 items-center font-semibold">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>
          </span>
          Total Price: {booking.totalPrice}
          {/* {booking.Payment.length > 0 && (
            <span
              className={`${
                booking.Payment[booking.Payment.length - 1].status ===
                "Completed"
                  ? "text-accent"
                  : "text-third"
              }`}
            >
              {booking.Payment[booking.Payment.length - 1].status ===
              "Completed"
                ? "Paid"
                : "Pending"}
            </span>
          )} */}
        </div>
      </div>

      {popup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 ">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-1/2 h-1/2 bg-white rounded-xl overflow-hidden flex"
          >
            <div className="w-1/2 h-full">
              <img
                src={booking.property.Image[0].url}
                alt={booking.property.title}
                className="w-full rounded-l-md h-full object-cover"
              />
            </div>

            <div className="flex flex-col w-1/2 justify-between p-8 h-full">
              <div>
                <div className="text-center font-semibold text-2xl">
                  Booking Confirmation
                </div>
                <div className="w-full flex flex-col">
                  <div className="mt-4 text-xl font-semibold">
                    {booking.property.title}
                  </div>
                  <div className="text-[#666] font-semibold">
                    {booking.property.address}
                  </div>
                  <div className="text-[#666] mt-2 flex flex-col">
                    <div>
                      Check-in:
                      {/* <br /> */}{" "}
                      <span className="font-semibold text-[#333]">
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      Check-out: {/* <br /> */}
                      <span className="font-semibold text-[#333]">
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-2  w-full flex border-t border-gray-400 pt-2 justify-between">
                  <div>Total Price: </div>
                  <span className="font-semibold text-[#333]">
                    {booking.totalPrice}
                  </span>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handlePayment.bind(
                      this,
                      booking.id,
                      booking.property.title,
                      booking.totalPrice
                    )}
                    className="px-2 py-1 text-white rounded-lg"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={deleteBooking.bind(this, booking.id)}
                    className="px-2 py-1 text-white rounded-lg !bg-third"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
