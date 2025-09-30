import React, { useRef, useEffect, useState } from 'react';
import 'ol/ol.css';
import './MapApp.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import { createStringYX } from './CoordinatesHelper';
import MousePosition from 'ol/control/MousePosition.js';
import { defaults as defaultControls } from 'ol/control/defaults.js';
import OSM from 'ol/source/OSM.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style.js';
import Overlay from 'ol/Overlay.js';
import { fromLonLat } from 'ol/proj.js';

export default function MapApp() {
  const [positions, setPositions] = useState([]);
  const mapRef = useRef(null);
  const olMap = useRef(null);
  const vectorSource = useRef(new VectorSource());
  const tooltipRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Load positions from JSON file
    fetch('/GTMotoMap/positions.json')
      .then((res) => res.json())
      .then((data) => setPositions(data))
      .catch((err) => console.error('Error loading positions:', err));
  }, []);

  useEffect(() => {
    if (positions.length === 0) return; // Wait until positions are loaded

    if (!olMap.current && mapRef.current) {
      const mousePositionControl = new MousePosition({
        coordinateFormat: createStringYX(4),
        projection: 'EPSG:4326',
        className: 'custom-mouse-position',
        target: undefined,
      });

      const tooltipElement = document.createElement('div');
      tooltipElement.className = 'tooltip';
      tooltipElement.style.position = 'absolute';
      tooltipElement.style.background = 'black';
      tooltipElement.style.color = 'white';
      tooltipElement.style.padding = '4px 8px';
      tooltipElement.style.border = '1px solid black';
      tooltipElement.style.borderRadius = '4px';
      tooltipElement.style.whiteSpace = 'nowrap';
      tooltipElement.style.display = 'none';
      tooltipRef.current = tooltipElement;

      const overlay = new Overlay({
        element: tooltipElement,
        offset: [10, 0],
        positioning: 'center-left',
      });
      overlayRef.current = overlay;

      olMap.current = new Map({
        controls: defaultControls().extend([mousePositionControl]),
        target: mapRef.current,
        layers: [
          new TileLayer({ source: new OSM() }),
          new VectorLayer({
            source: vectorSource.current,
            style: (feature) =>
              new Style({
                image: new CircleStyle({
                  radius: 6,
                  fill: new Fill({ color: feature.get('color') || 'red' }),
                  stroke: new Stroke({ color: 'black', width: 1 }),
                }),
              }),
          }),
        ],
        view: new View({
          center: fromLonLat([-84.3959, 33.7753]),
          zoom: 15.8,
          minZoom: 15,
          maxZoom: 18,
          extent: [-9398000, 3997000, -9392700, 4000500],
        }),
        overlays: [overlay],
      });

      positions.forEach(({ lat, lon, comment, color }) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          comment,
          color,
        });
        vectorSource.current.addFeature(feature);
      });

      olMap.current.on('pointermove', (evt) => {
        const feature = olMap.current.forEachFeatureAtPixel(evt.pixel, (feat) => feat);
        if (feature) {
          const coords = feature.getGeometry().getCoordinates();
          overlay.setPosition(coords);
          tooltipElement.innerHTML = feature.get('comment') || '';
          tooltipElement.style.display = 'block';
        } else {
          tooltipElement.style.display = 'none';
        }
      });

      return () => {
        if (olMap.current) {
          olMap.current.setTarget(undefined);
          olMap.current = null;
        }
      };
    }
  }, [positions]);

  return <div style={{ height: '100vh', width: '100vw' }} ref={mapRef} className="map-container" />;
}
