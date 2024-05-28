"use client";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Link from "next/link";

export default function MyMap(props) {
  const { positions, zoom } = props;
  const renderMarkers = () => {
    if (!positions) {
      return (
        <Marker position={[0, 0]}>
          <Popup>No position given</Popup>
        </Marker>
      );
    }
    return positions.map((position, i) => {
      return (
        <Marker key={i} position={[position.lat, position.lng]}>
          <Popup>
            {position.name && position.id && (
              <>
                <Link href={`venue/${position.id}`}>
                  <strong>{position.name}</strong>
                </Link>
                <br />
              </>
            )}
            {position.location.address} <br /> {position.location.city}.
          </Popup>
        </Marker>
      );
    });
  };
  return (
    <MapContainer
      className="map"
      center={positions ? [positions[0].lat, positions[0].lng] : [0, 0]}
      zoom={zoom | 1}
      height="300"
      width="200"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {renderMarkers()}
    </MapContainer>
  );
}
