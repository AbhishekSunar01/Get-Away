export default function Property({ property }) {
  return (
    <div className="w-[340px] rounded-3xl flex justify-center overflow-hidden">
      <div className="h-[470px] rounded-3xl w-[320px] flex flex-col cursor-pointer transition hover:text-primary delay-200 ease-in-out">
        <div className="bg-container relative h-[360px] transition-transform duration-200 hover:scale-105">
          <div
            className="overflow-hidden"
            style={{
              backgroundImage: `url(${
                property.Image && property.Image.length > 0
                  ? property.Image[0].url
                  : "defaultImageUrl"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "1.5rem",
              width: "100%",
              height: "100%",
            }}
            alt={property.title}
          ></div>
        </div>
        <div className="px-3 py-2 flex flex-col">
          <h2 className="text-base font-semibold leading-6">
            <div className="line-clamp-1 text-xl">{property.title}</div>
            <div className="">{property.address}</div>
          </h2>
          <p className="text-sm opacity-80 line-clamp-1">
            {property.description}
          </p>
          <p className="font-bold text-accent">
            Rs.{property.price}{" "}
            <span className="font-medium text-[#333]">per night</span>
          </p>
        </div>
      </div>
    </div>
  );
}
