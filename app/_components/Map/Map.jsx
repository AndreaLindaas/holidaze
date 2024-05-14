import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function MyMap(props) {
  const { position, zoom, location } = props;

  return (
    <MapContainer
      className="map"
      center={position}
      zoom={zoom}
      height="300"
      width="200"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {location.address} <br /> {location.city}.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
