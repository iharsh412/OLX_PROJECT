import { useEffect, useState } from 'react';
import './locationMap.css';
import { CLASSNAME, TEXT, PropsType } from './constant';

export default function LocationMap({ cityName, mapHeadingText }: PropsType) {
  const [center, setCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`
        );
        const result = await response.json();

        if (result.length > 0) {
          const { lat, lon } = result[0];
          setCenter([parseFloat(lat), parseFloat(lon)]);
        } else {
          console.warn(`No results found for ${cityName}`);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    if (cityName) {
      fetchData();
    }
  }, [cityName]);

  if (!center) return <p>{TEXT.LOADING}</p>;

  const [lat, lon] = center;
  const bbox = `${lon - 0.01},${lat - 0.01},${lon + 0.01},${lat + 0.01}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

  return (
    <div className={CLASSNAME.CONTAINER}>
      {mapHeadingText && <h5 className={CLASSNAME.TEXT}>{mapHeadingText}</h5>}
      <iframe
        className={CLASSNAME.IFRAMES}
        title={`Map of ${cityName}`}
        src={mapSrc}
      ></iframe>
    </div>
  );
}
