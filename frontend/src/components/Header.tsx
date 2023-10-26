import heroImg from "../../public/pexels-rachel-claire-5490825.jpg";

export default function Header() {
  return (
    <header className="header">
      <img
        className="header--img"
        src={heroImg}
        alt="dinner-table-woth plate and wine glass"
      />
      <div className="title">
        <h3>Spoonfed Recipes</h3>
      </div>
    </header>
  );
}
