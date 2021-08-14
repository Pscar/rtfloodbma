import dbConnect from "../../../utils/dbConnect";
import Kml from "../../../models/Kml";
import datas from "./o2s6uc.json";

let doc = datas.kml.Document;

const dataCenterOfMap = () => {
  const center_of_map = doc[0].LookAt.map((doc_item) => {
    let param_doc = [];
    param_doc = doc_item;
    return param_doc;
  });
  return center_of_map;
};

const dataPolygons = () => {
  const polygons = doc[0].Folder[4].Placemark.map((blue_item) => {
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
      return {
        longitude: temp[0],
        latitude: temp[1],
      };
    });
    return {
      name: param_blue.name[0],
      coordinates: res_datas,
    };
  });
  return polygons;
};

const dataBoundary = () => {
  let str =
    doc[0].Folder[6].Placemark[0].MultiGeometry[0].LineString[0].coordinates[0].toString();
  let datas_str = str.split("\r\n");
  let result_datas = datas_str.filter(
    (data_str) => data_str !== undefined && data_str !== ""
  );

  let res_datas = result_datas.map((item) => {
    let temp = item.trim().split(",");
    return {
      longitude: temp[0],
      latitude: temp[1],
    };
  });
  return {
    coordinates: res_datas,
  };
};

const dataToJson = async () => {
  const data_center = dataCenterOfMap();
  const data_bon = dataBoundary();
  const data_poly = dataPolygons();

  const input = { rains: {}, waters: {}, dem: {} };
  const center = {
    latitude: data_center[0].latitude[0],
    longitude: data_center[0].longitude[0],
  };

  const myObj = {
    _id: String,
    input: input,
    center_of_map: center,
    polygons: data_poly,
    boundary: data_bon,
  };

  const res_kmls = await Kml.updateOne({ _id: 1 }, myObj, { upsert: true });
  res_kmls.n;
  res_kmls.nModified;
  return res_kmls;
};

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const json = await dataToJson();
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
