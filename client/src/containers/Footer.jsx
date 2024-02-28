import facebook from "../assets/icons/facebook.svg";
import instagram from "../assets/icons/instagram.svg";
import tiktok from "../assets/icons/tiktok.svg";

export default function () {
  return (
    <div className="md:px-48 px-4 font-medium border border-t py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-lg">
        <div className="text-2xl">©</div>
        <span>2024 Gateaway, Inc</span>
      </div>
      <div className="flex gap-3 items-center">
        <span>Follow us on :</span>

        <img src={facebook} alt="facebook" />
        <img src={instagram} alt="instagram" />
        <img src={tiktok} alt="tiktok" />
      </div>
    </div>
  );
}
