import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export const Mappreview = ({ google, locations = [] }) => {
  return (
    <div>
      <Map
        google={google}
        containerStyle={{
          width: "480px",
          height: "360px",
        }}
        style={{
          width: "480px",
          height: "360px",
        }}
        center={locations[0]}
        initialCenter={locations[0]}
        zoom={locations.length === 1 ? 18 : 13}
        disableDefaultUI={true}
      >
        {locations.map((coords) => (
          <Marker position={coords} />
        ))}
      </Map>
      <br />
      <br />
    </div>
  );
};

// export default Mappreview;

export default GoogleApiWrapper({
  apiKey: "",
})(Mappreview);
