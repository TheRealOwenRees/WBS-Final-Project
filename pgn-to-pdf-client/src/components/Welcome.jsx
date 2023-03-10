import "./Welcome.scss";
import logo from "../assets/logo1.png";
import chesscom from "../assets/chesscom.png";
import lichess from "../assets/lichesslogowhite.png";
import chess24 from "../assets/chess24.png";
import pdf from "../assets/examplepdf.png";
import arrow from "../assets/arrow.png";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="pseudo-body-centered-container">
      <div className="welcome-grid-container">
        <div className="welcome-logo">
          <img
            src={logo}
            alt="logo"
            style={{
              width: "60%",
              height: "auto",
            }}
          />
        </div>
        <div className="images-grid-container">
          <div className="logos">
            <img
              id="arrow-image"
              src={chesscom}
              alt="chess.com logo"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
            <img
              src={lichess}
              alt="lichess logo"
              style={{
                width: "50%",
                height: "auto",
              }}
            />
            <img
              src={chess24}
              alt="chess24 logo"
              style={{
                width: "50%",
                height: "auto",
              }}
            />
          </div>
          <div>
            <img
              src={arrow}
              alt="arrow"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <div>
            <img
              src={pdf}
              alt="pdf"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
        <h1>Turn Your Chess PGN into a Beautiful PDF</h1>
        <div>
          <Link to="start">
            <button className="btn-get-started">Get Started</button>
          </Link>
        </div>
        <p>
          <Link to="/about">Learn More</Link>
        </p>
      </div>
    </div>
  );
};

export default Welcome;
