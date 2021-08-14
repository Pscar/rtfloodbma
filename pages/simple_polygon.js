import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";

const libraries = ["places", "geometry"];

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 13.7520351011916,
  lng: 100.625158820599,
};

const optionsPolygon = {
  fillColor: "#FF0000",
  fillOpacity: 1,
  strokeColor: "black",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: true,
  zIndex: 1,
};

const optionsBoundary = {
  fillColor: "lightblue",
  fillOpacity: 1,
  strokeColor: "black",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: true,
  zIndex: 1,
};
const onLoad = (polygon) => {
  console.log("polygon: ", polygon);
};

const onLoadB = (boundary) => {
  console.log("boundary: ", boundary);
};

function MyComponent({ kmls }) {
  const mapPolygons = kmls.map((kml, i) => {
    const polygons = kml.polygons.map((polygon, j) => {
      const paths = [polygon.coordinates];
      return (
        <Polygon
          key={j}
          onLoad={onLoad}
          paths={paths}
          options={optionsPolygon}
        />
      );
    });
    return polygons;
  });
  const mapBoundaries = kmls.map((kml, i) => {
    const paths = [kml.boundary.coordinates];
    return (
      <Polygon
        key={i}
        onLoad={onLoadB}
        paths={paths}
        options={optionsBoundary}
      />
    );
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAasO-faLL0R0XM5F03C3eaTJtDACtQGkY",
    libraries,
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
      >
        {mapBoundaries}
        {mapPolygons}
      </GoogleMap>
    </div>
  );
}

export default MyComponent;
