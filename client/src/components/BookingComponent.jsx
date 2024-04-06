export default function BookingComponent({ booking }) {
  return (
    <div
      className="w-full flex gap-4 border bg-background h-[250px] rounded-3xl overflow-hidden hover:shadow-md ease-linear transition-all duration-300 cursor-pointer"
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
          <p>
            Check-in: {new Date(booking.checkIn).toLocaleDateString()}{" "}
            Check-out: {new Date(booking.checkOut).toLocaleDateString()}
          </p>
        </div>
        <div className="text-xl font-medium">
          Total Price: {booking.totalPrice}
        </div>
      </div>
    </div>
  );
}
