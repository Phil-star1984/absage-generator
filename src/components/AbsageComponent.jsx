import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import absageTexte from "../data/absageTexte.json"; // Pfad überprüfen

const AbsageComponent = () => {
  const [searchParams] = useSearchParams();
  const [backgroundImage, setBackgroundImage] = useState("/images/img1.jpeg");
  const [randomText, setRandomText] = useState([]);
  const [textNumber, setTextNumber] = useState("");

  const name = decodeURIComponent(searchParams.get("name"));
  const jobTitle = decodeURIComponent(searchParams.get("jobTitle"));
  const company = decodeURIComponent(searchParams.get("company"));
  const applicantEmail = decodeURIComponent(searchParams.get("applicantEmail"));

  useEffect(() => {
    const randomNumber = Math.floor(
      Math.random() * absageTexte.absageTexte.length
    );
    const textParts = absageTexte.absageTexte[randomNumber].text;
    setRandomText(textParts);
    setTextNumber(randomNumber);

    const interval = setInterval(() => {
      // Generiere eine Zahl zwischen 1 und 4 (wenn du Bilder von img1 bis img4 hast)
      const randomCount = Math.floor(Math.random() * 4) + 1;
      const randomImage = `/images/img${randomCount}.jpeg`;
      console.log(randomImage);
      setBackgroundImage(randomImage);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const mailtoLink = () => {
    const bodyText =
      /* `${randomText[0]}${name}${randomText[1]}${jobTitle}${randomText[2]}${company}${randomText[3]}` + */
      `Hallo ${name}, unser Feedback findest du unter folgendem Link: ` +
      `${import.meta.env.VITE_BASE_URL}absage?name=${encodeURIComponent(
        name
      )}&jobTitle=${encodeURIComponent(jobTitle)}&company=${encodeURIComponent(
        company
      )}&applicantEmail=${encodeURIComponent(
        applicantEmail
      )}&textNumber=${textNumber}`;

    return `mailto:${applicantEmail}?subject=Deine Bewerbung als ${jobTitle}&body=${encodeURIComponent(
      bodyText
    )}`;
  };

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
      }}
    >
      <div className="absage-container">
        <h1>
          {randomText[0]}
          <span className="color-emphasis">{name}</span>,<br />
          <br />
          {randomText[1]}
          <span className="color-emphasis">{jobTitle}</span>
          {randomText[2]}
          <span className="color-emphasis">{company}</span>
          {randomText[3]}
        </h1>
        <div className="absage-buttons-container">
          <button onClick={() => (window.location.href = mailtoLink())}>
            An Bewerber senden
          </button>
          <button onClick={() => window.history.back()}>Neu generieren</button>
        </div>
      </div>
    </div>
  );
};

export default AbsageComponent;
