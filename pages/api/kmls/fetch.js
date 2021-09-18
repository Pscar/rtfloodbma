import dbConnect from "../../../utils/dbConnect";
import { Sequelize, QueryTypes } from 'sequelize';
const fs = require('fs');
const unzipper = require("unzipper");
const xml2js = require('xml2js');

import axios from "axios";
import Kml from "../../../models/Kml";

const sequelize = new Sequelize(`mysql://weather:weather@weather.ckartisan.com:3306/weather`);

const getWeather = async () => {
  // query for weather
  const weathers = await sequelize.query("SELECT kmls FROM `weathers`", {
    type: QueryTypes.SELECT,
  });
  // map weathers to kmls
  const kmls = await weathers.map((item) => item.kmls);
  console.log("length", kmls.length);
  let number = 0;
  for await (const data of kmls) {
    const url = `https://weather.ckartisan.com/storage/${data}`;
    let random = Math.random().toString(36).substring(7);
    const randomNameZip = `${random}.zip`;
    const output = `kmls/${randomNameZip}`;
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      await fs.writeFileSync(output, response.data, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
      await unZip(output, randomNameZip, number);
      number += 1;
      const xml = await fs.readFileSync(`data/${number}_${randomNameZip}/2D_Base.kml`, "utf8");
      await writeXmltoJson(xml, random);

    } catch (error) {
      console.log("error =>", error);
    }
    break;
  }
};
const unZip = async (output, randomNameZip, number) => {
  return new Promise((resolve, reject) => {
    number += 1;
    const reader = fs.createReadStream(output);
    reader
      .pipe(unzipper.Extract({ path: `data/${number}_${randomNameZip}` }))
      .on("error", reject)
      .on("finish", resolve);
  });
};

const writeXmltoJson = async (xml, random) => {
  const writeJson = new xml2js.Parser();
  writeJson
    .parseStringPromise(xml)
    .then(async (result) => {
      const data_center_of_map = () => {
        const center_of_map = result.kml.Document[0].LookAt.map((doc_item) => {
          let param_doc = [];
          param_doc = doc_item;
          return param_doc;
        });
        return center_of_map;
      };
      const data_polygons = () => {
        const polygons = result.kml.Document[0].Folder[4].Placemark.map(
          (blue_item) => {
            let param_blue = [];
            param_blue = blue_item;

            let str =
              param_blue.MultiGeometry[0].Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates[0].toString();
            let datas_str = str.split("\r\n");
            let result_datas = datas_str.filter(
              (data_str) => data_str !== undefined && data_str !== ""
            );

            let res_datas = result_datas.map((item) => {
              let temp = item.trim().split(",");
              //return temp;
              return {
                lat: parseFloat(temp[1]),
                lng: parseFloat(temp[0]),
              };
            });
            //return res_datas;
            return {
              name: param_blue.name[0],
              coordinates: res_datas,
            };
          }
        );
        return polygons;
      };
      const data_boundary = () => {
        let str =
          result.kml.Document[0].Folder[6].Placemark[0].MultiGeometry[0].LineString[0].coordinates[0].toString();
        let datas_str = str.split("\r\n");
        let result_datas = datas_str.filter(
          (data_str) => data_str !== undefined && data_str !== ""
        );

        let res_datas = result_datas.map((item) => {
          let temp = item.trim().split(",");
          return {
            lat: parseFloat(temp[1]),
            lng: parseFloat(temp[0]),
          };
        });
        return {
          coordinates: res_datas,
        };
      };
      const data_center = data_center_of_map();
      const data_bon = data_boundary();
      const data_poly = data_polygons();

      const input = { rains: {}, waters: {}, dem: {} };
      const center = {
        lat: parseFloat(data_center[0].latitude[0]),
        lng: parseFloat(data_center[0].longitude[0]),
      };

      const myObj = {
        input: input,
        center_of_map: center,
        polygons: data_poly,
        boundary: data_bon,
      };

      await data_Json(myObj, random);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

const data_Json = async (myObj, random) => {
  const res_kmls = await Kml.collection.insertOne({ id: random, data: myObj });
  return res_kmls
};

getWeather();

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const json = await data_Json();
        res.status(200).json({ success: true, data: json });
      } catch (error) {
        console.log("catch", error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      console.log("default");
      res.status(400).json({ success: false });
      break;
  }
}
