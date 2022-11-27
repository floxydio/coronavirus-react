import React from "react";
import HeadBar from "./pages/Headbar/Headbar";
import Main from "./pages/Main/Main";


export default function App() {

  const mailMe =() => {
    window.open('mailto:diooktar@gmail.com');
  }

  return (
    <>
      <HeadBar />
      <Main />
      <a href="#" onClick={mailMe} className="floating_issue">Have issue? Contact Me
      </a>

    </>
  )
}
