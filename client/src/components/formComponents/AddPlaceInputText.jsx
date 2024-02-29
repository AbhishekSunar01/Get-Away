export default function AddPlaceInputText({ title, desc, value, onchange }) {
  return (
    <div className="inputContainer">
      <div>
        <label className="inputContainerTitle">{title}</label>
        <div className="inputContainerInput">{desc}</div>
      </div>
      <input
        className="border rounded-2xl w-full my-3 outline-none py-2 px-3 h-10 text-lg"
        type="text"
        value={value}
        onChange={onchange}
        required
      />
    </div>
  );
}
