import React, { useState } from "react";
import Input from "./TitleInput";
import Preview from "./Preview";
import Navbar from "./Navbar";
import TitleInput from "./TitleInput";
import BodyInput from "./BodyInput";
import FooterInput from "./FooterInput";

const Home = () => {
  const [tab, setTab] = useState(1);
  const [enableUpload, setEnableUpload] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState({
    logo: "",
    title: {
      text: "",
      font_size: "20px",
      color: "#000000",
    },
    body: {
      text: "",
      font_size: "16px",
      color: "#000000",
    },
    footer: {
      text: "",
      font_size: "14px",
      color: "#000000",
    },
    image: "",
    background: "white",
  });

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <Preview emailTemplate={emailTemplate} enableUpload={enableUpload} />
        </div>
        <div className="w-1/2">
          {tab === 1 && (
            <TitleInput
              tab={tab}
              setTab={setTab}
              emailTemplate={emailTemplate}
              setEmailTemplate={setEmailTemplate}
            />
          )}
          {tab === 2 && (
            <BodyInput
              tab={tab}
              setTab={setTab}
              emailTemplate={emailTemplate}
              setEmailTemplate={setEmailTemplate}
            />
          )}
          {tab === 3 && (
            <FooterInput
              tab={tab}
              setTab={setTab}
              emailTemplate={emailTemplate}
              setEmailTemplate={setEmailTemplate}
              setEnableUpload={setEnableUpload}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
