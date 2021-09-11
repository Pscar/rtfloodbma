import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MyComponent from "../pages/simple_polygon.js";
import axios from "axios";
import { useState, useEffect } from "react";
const Home = () => {
  const [kmls, setKmls] = useState([]);

  useEffect(() => {
    const fetchKmls = async () => {
      const response = await axios.get("http://localhost:3000/api/kmls");
      const kmlData = await response.data.data;
      setKmls(kmlData);
    }
    fetchKmls();
  }, []);

  const listArray = kmls.map((kml) => kml);
  console.log(listArray)


  return (
    <div>
      <MyComponent kmls={listArray} />
    </div>
  );
};

export default Home;
