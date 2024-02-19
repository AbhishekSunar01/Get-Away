export default function AddPlaceLabel({ title, desc }) {
  return (
    <div>
      <label className="inputContainerTitle">{title}</label>
      <div className="inputContainerInput">{desc}</div>
    </div>
  );
}
