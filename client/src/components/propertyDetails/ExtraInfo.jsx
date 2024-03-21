export default function ExtraInfo({ property }) {
  return (
    <>
      {property.extraInfo && (
        <div className="w-full bg-gray-100 px-10 shadow-lg py-6 rounded-2xl">
          <h1 className="text-3xl font-semibold">Extra Info</h1>
          <p>{property.extraInfo}</p>
        </div>
      )}
    </>
  );
}
