import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const [backgroundImage, setBackgroundImage] = useState("/images/img1.jpeg");
  const [jobTitle, setJobTitle] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      // Generiere eine Zahl zwischen 1 und 4 (wenn du Bilder von img1 bis img4 hast)
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      const randomImage = `/images/img${randomNumber}.jpeg`;
      setBackgroundImage(randomImage);
      /* console.log(randomImage); */
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerate = () => {
    const encodedName = encodeURIComponent(applicantName);
    const encodedJobTitle = encodeURIComponent(jobTitle);
    const encodedCompany = encodeURIComponent(companyName);
    const encodedApplicantEmail = encodeURIComponent(applicantEmail);
    navigate(
      `/absage?name=${encodedName}&jobTitle=${encodedJobTitle}&company=${encodedCompany}&applicantEmail=${encodedApplicantEmail}`
    );
  };

  const IT = "{it}";

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
      <h1 className="logo">Take{IT}easy</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Generiere eine Absage</h1>
        <label>
          Jobtitel:
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Bewerbername:
          <input
            type="text"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Bewerber E-Mail:
          <input
            type="email"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Unternehmensname:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" onClick={handleGenerate}>
          Absage generieren
        </button>
      </form>
    </div>
  );
};

export default HomeComponent;
