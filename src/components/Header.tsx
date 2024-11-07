import icon from "/img/icon.png";
import "./Header.css";
export default function Header() {
  return (
    <div className="title">
      <div className="img">
        <img src={icon} alt="" />
      </div>
      <h1 className="info">Payment info</h1>
    </div>
  );
}
