import Navbar from "./Navbar";
import Hero from "./Hero";

const Start = () => {
  return (
    <div className="main-grid-container">
      <header className="header">
        <Navbar />
        <Hero />
      </header>
      <main>
        <h1>Start Page</h1>
      </main>
    </div>
  );
};

export default Start;
