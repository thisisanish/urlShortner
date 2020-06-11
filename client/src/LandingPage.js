import React, { useState } from "react";
import axios from "axios";
import QRC from "qrcode.react";
import validator from "validator";
import saveSvgAsPng from "save-svg-as-png";

const LandingPage = () => {
  const title = "Teensy Url"
  // const [copyStatus, setCopyStatus] = useState("Click to copy")
  const [longUrl, setLongUrl] = useState("");
  const [afterClickLongUrl, setAfterClickLongUrl] = useState("")
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const feedback = (
    <div>
      <p className="text-danger">Invalid Url. Kindly check the entered URL (´ ͡༎ຶ ͜ʖ ͡༎ຶ )</p>
    </div>
  );



  function getShortUrl(event) {
    event.preventDefault();
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    setError("")

    if (validator.isURL(longUrl)) {
      setError("");
      axios({
        method: "POST",
        url: "https://teensygo.herokuapp.com/api/shorten",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "*",
        },
        // eslint-disable-next-line object-shorthand
        data: { longUrl },
      })
        .then((res) => {
          setShortUrl(res.data.shortUrl);
          setAfterClickLongUrl(longUrl)

 
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log("Sorry, We ran into an error :( \n",err));
    } else {
      setError("Invalid URL");
    }
  }
  const imageOptions = {
    scale: 5,
    encoderOptions: 1,
    backgroundColor: "white",
  };
  function downloadImage() {
    saveSvgAsPng.saveSvgAsPng(
      document.getElementById("svgQr"),
      "qr.png",
      imageOptions
    );
  }
  const ResultCard = (
    <div className="card border-primary mb-3" style={{ padding: "50" }}>
      <div className="card-header text-center">{afterClickLongUrl} </div>
      <div className="card-body">
        <div className="text-center">
          {/* <button
            style={{width:"100%"}}
            type="button"

            className="btn copy btn-primary"
            onClick={() => {
              navigator.clipboard.writeText(shortUrl);
              setCopyStatus("Copied Successfully :-)")
            }}
          >
            <h3>
              <i className="fa fa-lg fa-copy text-light" />
              &nbsp; &nbsp;
              <u className="text-white text-lowercase">{shortUrl}</u>
            </h3>
            {copyStatus}
          </button> */}
          <h3 className="bg-primary p-4" style={{borderRadius:"1rem"}}>
              <i className="fa fa-lg fa-copy text-light p-2" unselectable="true"/>
              
              <br/>
              <u className="text-white text-lowercase">{shortUrl}</u>
            </h3>
        </div>

        <hr />

        <div className="text-center">
          <QRC
            value={afterClickLongUrl}
            renderAs="svg"
            id="svgQr"
            size={afterClickLongUrl === "" ? 0 : 250}
          />
        </div>
        <br />

        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={downloadImage}
          >
            <i className="fa fa-lg fa-download" />
            &nbsp; &nbsp; Download QR COde
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
    
 
    }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          {title}
        </a>
      </nav>
      <br />
      <div className="container" >
        <div className="jumbotron">
          <h1 className="display-3">{title}</h1>
          <p className="lead">
            We Generate Short teensy Url and QR codes that you can download and share from your Big bulky ugly Urls.
          </p>
        </div>
        <form onSubmit={getShortUrl}>
          <div className="form-group">
            <div className="input-group mb-3" style={{fontSize:"100%"}}>
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i
                    className="fa fa-large fa-link"
                    style={{ fontSize: "200%" }}
                  />
                </span>
              </div>
              <input
                type="text"
                className="form-control input-lg"
                id="input-lg"
                placeholder="www.domain.com"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                style={{ fontSize: "150%" }}
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ fontSize: "200%" }}
                ><i className="fa fa-rocket" />
                </button>
              </div>
            </div>
          </div>
        </form>
        {error !== "" ? feedback : <hr />}
        {shortUrl !== "" ? ResultCard : <p className="text-center">Come on, Give it a try mate ! ¯\_(ツ)_/¯</p>}

      </div>
      <footer
        className="fixed-bottom text-center bg-primary text-white"
        style={{
          marginTop: "2rem"
        }}


      >
        With <i className="fa fa-heart text-danger" color="red" /> From{" "}
        <a href="http://github.com/thisisanish"  className="text-white"> Anish Agarwal</a>
      </footer>
    </div>
  );
};

export default LandingPage;
