import { Link, useParams } from "react-router-dom";
import img from "../../public/payment.jpg";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Payment() {
  let query = useQuery();
  let status = query.get("status");
  const bookingId = query.get("purchase_order_id");

  console.log(status);
  console.log(bookingId);

  useEffect(() => {
    if (status === "Completed") {
      // Call your API here
      axios
        .post("/payment", { status, bookingId })
        .then((response) => {
          // Handle the response here
          console.log(response);
        })
        .catch((error) => {
          // Handle the error here
          console.log(error);
        });
    }
  }, [status]);

  return (
    <div className="w-full flex justify-center">
      <img src={img} alt="Khalti" />
      <div className="mt-24">
        <div className="text-primary font-bold text-[4rem]">
          {status === "User canceled"
            ? "Payment canceled !!"
            : "Payment Successfull !!!"}
        </div>
        <Link to="/" className="text-lg underline font-semibold">
          Book a property
        </Link>
      </div>
    </div>
  );
}
