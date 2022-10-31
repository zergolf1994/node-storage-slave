"use strict";

const path = require("path");
const Files = require("../modules/Mysql/Files");
const Storage = require("../modules/Mysql/Storage");
const FilesVideo = require("../modules/Mysql/FilesVideo");
const Progress = require("../modules/Mysql/Progress");
const { Sequelize, Op } = require("sequelize");
const http = require("http");

let inputPath, gid;

module.exports = async (req, res) => {
  const { slug, quality, token, file_name, slave_ip } = req.query;
  try {
    if (!slug) return res.json({ status: false });
    //if (!quality) return res.json({ status: false });

    const storage = await Storage.findOne({
      where: { active: 1 },
      order: [["disk_percent", "ASC"]],
    });

    if (!storage) {
      return res.json({ status: false });
      // remove file and cancle download
    }
    let host = `http://${storage?.sv_ip}:8888/slave/start?slug=${slug}&slave_ip=${slave_ip}`;
    let video = `http://${slave_ip}:8888/${token}/${file_name}`;

    http.get(host, function (resp) {
      resp.on("end", function () {
      });
    });
    return res.json({ status: true });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: error.name });
  }
};
