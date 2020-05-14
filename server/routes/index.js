const express = require("express"),
  router = express.Router(),
  { link } = require("../controller/index");

router.get("/:lilid", link), (module.exports = router);
