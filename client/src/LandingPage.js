import React, { useState } from "react";
import axios from "axios";
import QRC from "qrcode.react";
import validator from "validator";
import saveSvgAsPng from "save-svg-as-png";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const feedback = (
    <div>
      <p className="text-danger">Invalid Url. Kindly check the entered URL</p>
    </div>
  );

  function getShortUrl(event) {
    event.preventDefault();
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

    if (validator.isURL(longUrl)) {
      setError("");
      axios({
        method: "POST",
        url: "http://localhost:4100/api/shorten",
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
          console.log(res);
        })
        .catch((err) => console.log(err));
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
      <div className="card-header text-center">{longUrl} </div>
      <div className="card-body">
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigator.clipboard.writeText(shortUrl);
            }}
          >
            <h3>
              <i className="fa fa-lg fa-copy" />
              &nbsp; &nbsp;
              <u>{shortUrl}</u>
            </h3>
            click to copy
          </button>
        </div>

        <hr />

        <div className="text-center">
          <QRC
            value={shortUrl}
            renderAs="svg"
            id="svgQr"
            size={shortUrl === "" ? 0 : 250}
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
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          L'il Url
        </a>
      </nav>
      <br />
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">L'IL URL</h1>
          <p className="lead">
            We Generate Short Url and QR codes to your Big bulky Urls.
          </p>
        </div>
        <form onSubmit={getShortUrl}>
          <div className="form-group">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i
                    className="fa fa-large fa-link"
                    style={{ fontSize: "2em" }}
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
                style={{ fontSize: "2em" }}
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ fontSize: "2em" }}
                >
                  Generate Short URL &nbsp;
                  <i className="fa fa-hand-peace-o" />
                </button>
              </div>
            </div>
          </div>
        </form>
        {error !== "" ? feedback : <hr />}
        {shortUrl !== "" ? ResultCard : <br />}
      </div>
      <footer
        style={{
          bottom: "0",
          position: "fixed",
          textAlign: "center",
          width: "100%",
        }}
      >
        With <i className="fa fa-heart" color="red" /> From{" "}
        <a href="www.github.com/thisisanish">Anish Agarwal</a>
      </footer>
    </div>
  );
};

export default LandingPage;
