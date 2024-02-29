export default function AddPlaceCCP({ label, type, id, value, onchange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="checkIn" className="font-md">
        {label}
      </label>
      <input
        className="mt-3 rounded-md"
        type={type}
        id={id}
        value={value}
        onChange={onchange}
        required
      />
    </div>
  );
}
