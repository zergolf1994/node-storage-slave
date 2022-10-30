"use strict";

const shell = require("shelljs");
const path = require("path");

module.exports = async (req, res) => {
  const { token } = req.query;
  try {
    if (!token) return res.json({ status: false });
    //if (!quality) return res.json({ status: false });
    let folder_token = path.join(global.dir, `public/${token}/`);
    shell.exec(
      `sudo rm -rf ${folder_token}`,
      { async: false, silent: false },
      function (data) {}
    );

    return res.json({ status: true });
  } catch (error) {
    return res.json({ status: false, msg: error.name });
  }
};
