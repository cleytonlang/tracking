import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import Card from "components/card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for the default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ address }) => {
  const [coordinates, setCoordinates] = useState([-23.550520, -46.633308]); // Default to São Paulo coordinates
  const [mapError, setMapError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
          setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          setMapError(null);
        } else {
          setMapError('Address not found');
        }
      } catch (error) {
        setMapError('Error fetching location');
        console.error('Geocoding error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [address]);

  if (isLoading) {
    return (
      <div className="w-full h-[200px] rounded-xl bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse">Loading map...</div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="w-full h-[200px] rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
        {mapError}
      </div>
    );
  }

  return (
    <div className="w-full h-[200px] rounded-xl overflow-hidden">
      <MapContainer
        center={coordinates}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordinates}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

const NftCard = ({ title, author, price, image, bidders, extra, address }) => {
  const [heart, setHeart] = useState(true);
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <MapComponent address={address} />
          
          {/* <img
            src={image}
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          /> */}
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {" "}
              {title}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900 md:mt-2 dark:text-white">
              <strong>Driver</strong> {author}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900 md:mt-2 dark:text-white">
              <strong>Address</strong> {address}{" "}
            </p>
          </div>

          <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
            <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
              +5
            </span>
            {bidders.map((avt, key) => (
              <span
                key={key}
                className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white dark:!border-navy-800"
              >
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={avt}
                  alt=""
                />
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="mb-2 text-lg font-bold text-brand-500 dark:text-white">
              kilometers to go: {price} <span>Km</span>
            </p>
          </div>
          <button
            href=""
            className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          >
            Details
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
