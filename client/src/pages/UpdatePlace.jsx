import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdatePlace() {
  const { id } = useParams();

  async function deleteProperty() {
    const response = await axios.delete(`property/delete/${id}`);
    if (response.status === 200) {
      console.log("Property deleted successfully");
      fetchProperties();
    } else {
      console.error("Failed to delete property:", response.data);
    }
  }

  return (
    <div>
      <h1>Update Place</h1>

      <button onClick={deleteProperty}>Delete Property</button>
    </div>
  );
}
