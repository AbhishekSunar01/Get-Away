export default function AddPlaceCCP({ label, id, value, onchange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="checkIn" className="font-md">
        {label}
      </label>
      <input
        className="mt-3 rounded-md"
        type="text"
        id={id}
        value={value}
        onChange={onchange}
      />
    </div>
  );
}
