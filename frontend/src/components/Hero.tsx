import heroImg from "../assets/pexels-rachel-claire-5490825.jpg";

export default function Hero() {
  return (
    <header className="hero">
      <img
        className="hero--img"
        src={heroImg}
        alt="dinner-table-woth plate and wine glass"
      />
      <div className="title">
        <h3>Spoonfed Recipes</h3>
      </div>
    </header>
  );
}
