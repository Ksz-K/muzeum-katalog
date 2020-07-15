import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
 

const styles = {
  width: "100%",
  height: "300px",
  position: "absolute"
};

const MapBox  = ({lng,lat,title}) => {
    console.log(lng,lat)
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiMzc1cG0iLCJhIjoiY2tjZGI3azlhMGN2ejJxcDJoY3BqdmdzbiJ9.38an9JFz22axt1fae-TN8Q";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",  
        center: [lng, lat],
        zoom: 12
      })

     
         map.on("load", () => {
            map.addLayer({
                id: "points",
                type: "symbol",
                source: {
                  type: "geojson",
                  data: {
                    type: "FeatureCollection",
                    features: [
                      {
                        type: "Feature",
                        geometry: {
                          type: "Point",
                          coordinates: [lng, lat],
                        },
                        properties: {
                          title,
                          icon: "museum",
                        },
                      },
                       
                    ],
                  },
                },
                layout: {
                  "icon-image": "{icon}-15",
                  "text-field": "{title}",
                  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                  "text-offset": [0, 0.6],
                  "text-anchor": "top",
                },
            
              });
        setMap(map);
        map.resize();
      });
 
    }
      
   

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default MapBox ;




 