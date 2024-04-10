export default function AddPlaceInputArea({
  title,
  desc,
  value,
  onchange,
  required,
}) {
  return (
    <div className="inputContainer">
      <div>
        <label className="inputContainerTitle">{title}</label>
        <div className="inputContainerInput">{desc}</div>
      </div>
      <textarea
        className="border rounded-2xl my-3 w-full outline-none py-2 px-3 h-32 text-lg"
        type="text"
        value={value}
        onChange={onchange}
        required={required}
      />
    </div>
  );
}
