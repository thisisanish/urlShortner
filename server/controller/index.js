const mongoose = require("mongoose");
const Url = require("../models/url");

exports.link = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.lilid });
    if (url) {
      console.log(url.id);

      if (mongoose.Types.ObjectId.isValid(url.id)) {
        Url.findByIdAndUpdate(
          url.id,
          {
            $set: {
              redirectCount: url.redirectCount + 1,
              lastRedirect: Date(),
            },
          },
          { new: true }
        )
          .then((docs) => {
            if (docs) {
              resolve({ success: true, data: docs });
            } else {
              reject({ success: false, data: "no such user exist" });
            }
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject({ success: "false", data: "provide correct key" });
      }
      console.log(url.userCount);

      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("no Url found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
};
