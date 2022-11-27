import React from "react";
import imageHeadbar from '../../assets/coronavirus.png';
import { Container } from "../../component/Container";
import  "./headbar_css.css"

export default function HeadBar() {
  return(
    <Container  marginTop="20px">
      <img src={imageHeadbar} alt="CoronaVirus" width={70} height={70} />
      <h2 style={{
        'marginTop' : '30px',
        'fontSize' : '22px',
        'letterSpacing' : '3px'
      }}>CoronaTracker by flox</h2>
      <div className="menu__headbar flex flex-row">
        <a className="pr-6">Home</a>
        <a className="pr-6">About</a>
        <a className="pl-6">Request</a>
      </div>
    </Container>
  )
}
