const express = require("express"),
  router = express.Router(),
  validUrl = require("valid-url"),
  shortid = require("shortid"),
  config = require("config"),
  Url = require("../models/url"),
  mongoose = require("mongoose"),
  validator = require("validator");

// @route   Post /api/url/shorten
// @desc    create short url

router.post("/shorten", async (req, res) => {
  await console.log(req.body);

  const { longUrl, needCustom, customURL } = req.body;

  const baseUrl = config.get("baseUrl");
  // check base url

  if (!validator.isURL(baseUrl)) {
    return res.status(400).json({ error: "Invalid base Url" });
  }
  // create url code

  // check long url
  console.log(!validUrl.isUri(longUrl));

  if (validator.isURL(longUrl)) {
    try {
      var urlCode = shortid.generate();
      let url = await Url.findOne({ longUrl }).select("-_id shortUrl longUrl");
      if (url) {
        res.send(url).status(200);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();

        res.json(url);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(err);
    }
  } else {
    res.status(400).json({ error: "Invalid long url" });
  }
});

module.exports = router;
