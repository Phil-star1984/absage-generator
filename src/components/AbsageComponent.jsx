import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import absageTexte from "../data/absageTexte.json"; // Pfad überprüfen

const AbsageComponent = () => {
  const [searchParams] = useSearchParams();
  const [backgroundImage, setBackgroundImage] = useState("/images/img1.jpeg");
  const [randomText, setRandomText] = useState([]);
  const [textNumber, setTextNumber] = useState("");

  const name = decodeURIComponent(searchParams.get("name") || "");
  const jobTitle = decodeURIComponent(searchParams.get("jobTitle") || "");
  const company = decodeURIComponent(searchParams.get("company") || "");
  const applicantEmail = decodeURIComponent(
    searchParams.get("applicantEmail") || ""
  );
  const fromApplicant = decodeURIComponent(
    searchParams.get("fromApplicant") || ""
  );

  useEffect(() => {
    if (fromApplicant === "true") {
      // Wenn der Link vom Bewerber geöffnet wird
      const savedTextNumber = parseInt(searchParams.get("textNumber"), 10);
      const textParts = absageTexte.absageTexte[savedTextNumber]?.text || [];
      setRandomText(textParts);
      setTextNumber(savedTextNumber);
    } else {
      // Für ein Unternehmen, das den Text generiert
      const randomNumber = Math.floor(
        Math.random() * absageTexte.absageTexte.length
      );
      const textParts = absageTexte.absageTexte[randomNumber].text;
      setRandomText(textParts);
      setTextNumber(randomNumber);
    }

    const interval = setInterval(() => {
      const randomCount = Math.floor(Math.random() * 4) + 1;
      const randomImage = `/images/img${randomCount}.jpeg`;
      setBackgroundImage(randomImage);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const mailtoLink = () => {
    const bodyText =
      `Hallo ${name}, unser Feedback findest du unter folgendem Link: ` +
      `${import.meta.env.VITE_BASE_URL}absage?name=${encodeURIComponent(
        name
      )}&jobTitle=${encodeURIComponent(jobTitle)}&company=${encodeURIComponent(
        company
      )}&applicantEmail=${encodeURIComponent(
        applicantEmail
      )}&textNumber=${textNumber}&fromApplicant=true`;

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
        {!fromApplicant && (
          <div className="absage-buttons-container">
            <button onClick={() => (window.location.href = mailtoLink())}>
              An Bewerber senden
            </button>
            <button onClick={() => window.history.back()}>
              Neu generieren
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbsageComponent;
