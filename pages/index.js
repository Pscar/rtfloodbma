import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MyComponent from "../pages/simple_polygon.js";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [kmls, setKmls] = useState([]);

  async function fetchKmls() {
    const response = await axios.get("http://localhost:3000/api/kmls");
    const kmlData = await response.data.data;
    setKmls(kmlData);
  }

  useEffect(() => {
    fetchKmls();
  }, []);

  const listArray = kmls.map((kml) => kml);
  // const items = kmls.slice(0, 10);
  // console.log("222222", items);

  return (
    <div>
      {/* <h1>hello</h1>
      {items.map((item, index) => (
        <h1 key={index}>
          {item.center_of_map.latitude} / {item.center_of_map.longitude}
        </h1>
      ))} */}
      <MyComponent kmls={listArray} />
    </div>
  );
};

export default Home;
