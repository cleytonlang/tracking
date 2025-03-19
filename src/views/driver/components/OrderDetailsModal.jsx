import React from "react";
import Card from "components/card";
import { MdClose, MdLocationOn, MdPerson, MdAssignment, MdDeliveryDining, MdAddAPhoto, MdOutlinePhoto } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from "react";

// Fix for the default marker icon in Leaflet
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

const OrderDetailsModal = ({ isOpen, onClose, orderData }) => {
  const [deliveryPhotos, setDeliveryPhotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState('');
  
  useEffect(() => {
    // Quando um pedido é carregado, defina o status inicial com base no status do pedido
    if (orderData) {
      setDeliveryStatus(orderData.status);
    }
  }, [orderData]);
  
  if (!isOpen || !orderData) return null;

  // Determinando a cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "In Progress":
        return "text-yellow-500";
      case "Pending":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files) {
      setIsUploading(true);
      
      // Simulação de upload - em produção, seria feito para um servidor
      setTimeout(() => {
        const newPhotos = Array.from(e.target.files).map(file => ({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          url: URL.createObjectURL(file),
          timestamp: new Date().toLocaleString()
        }));
        
        setDeliveryPhotos(prev => [...prev, ...newPhotos]);
        setIsUploading(false);
      }, 1000);
    }
  };
  
  const removePhoto = (photoId) => {
    setDeliveryPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const startDelivery = () => {
    setDeliveryStatus("In Progress");
    // Aqui seria feita a atualização no backend
    console.log("Delivery started for order:", orderData.order);
  };
  
  const completeDelivery = () => {
    if (deliveryPhotos.length === 0) {
      alert("Por favor, adicione pelo menos uma foto antes de finalizar a entrega.");
      return;
    }
    
    setDeliveryStatus("Completed");
    // Aqui seria feita a atualização no backend
    console.log("Delivery completed for order:", orderData.order);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
      <Card extra="w-full max-w-[650px] p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-navy-700 dark:text-white">
            Order Details #{orderData.order}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-600 dark:text-white hover:text-brand-500"
          >
            <MdClose className="h-6 w-6" />
          </button>
        </div>

        {/* Map Section */}
        <div className="mb-4">
          <MapComponent address={orderData.address} />
        </div>

        <div className="space-y-4">
          {/* Status */}
          <div className="flex items-center">
            <div 
              className={`h-3 w-3 rounded-full mr-2 ${
                deliveryStatus === "Completed"
                  ? "bg-green-500"
                  : deliveryStatus === "In Progress"
                  ? "bg-yellow-500" 
                  : "bg-red-500"
              }`}
            />
            <p className={`text-lg font-medium ${getStatusColor(deliveryStatus)}`}>
              {deliveryStatus}
            </p>
          </div>

          {/* Customer Info and Location Info in Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Info */}
            <div className="p-3 bg-gray-100 dark:bg-navy-700 rounded-lg h-full">
              <div className="flex items-center mb-2">
                <MdPerson className="h-5 w-5 text-brand-500 mr-2" />
                <h4 className="font-semibold text-navy-700 dark:text-white">Customer</h4>
              </div>
              <p className="ml-7 text-gray-700 dark:text-gray-300">{orderData.customer[0]}</p>
            </div>

            {/* Location Info */}
            <div className="p-3 bg-gray-100 dark:bg-navy-700 rounded-lg h-full">
              <div className="flex items-center mb-2">
                <MdLocationOn className="h-5 w-5 text-brand-500 mr-2" />
                <h4 className="font-semibold text-navy-700 dark:text-white">Delivery Address</h4>
              </div>
              <p className="ml-7 text-gray-700 dark:text-gray-300">{orderData.address}</p>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="p-3 bg-gray-100 dark:bg-navy-700 rounded-lg">
            <div className="flex items-center mb-2">
              <MdDeliveryDining className="h-5 w-5 text-brand-500 mr-2" />
              <h4 className="font-semibold text-navy-700 dark:text-white">Delivery Details</h4>
            </div>
            <p className="ml-7 text-gray-700 dark:text-gray-300">Distance: {orderData.distance} km</p>
            <p className="ml-7 text-gray-700 dark:text-gray-300">Estimated Time: {parseInt(orderData.distance) * 3 + 5} min</p>
          </div>
          
          {/* Delivery Photos Section */}
          <div className="p-3 bg-gray-100 dark:bg-navy-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <MdOutlinePhoto className="h-5 w-5 text-brand-500 mr-2" />
                <h4 className="font-semibold text-navy-700 dark:text-white">Delivery Photos</h4>
              </div>
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                  onChange={handleFileChange}
                  disabled={isUploading || deliveryStatus === "Completed"}
                />
                <div className={`flex items-center text-sm ${
                  deliveryStatus === "Completed" 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-brand-500 dark:text-brand-400 hover:text-brand-600"
                }`}>
                  <MdAddAPhoto className="h-5 w-5 mr-1" />
                  <span>Add Photos</span>
                </div>
              </label>
            </div>
            
            {isUploading && (
              <div className="ml-7 mb-2 text-gray-600 dark:text-gray-400 flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-brand-500 border-t-transparent rounded-full mr-2"></div>
                <span>Uploading photos...</span>
              </div>
            )}
            
            {deliveryPhotos.length === 0 && !isUploading ? (
              <p className="ml-7 text-gray-500 dark:text-gray-400 italic">
                No photos attached yet. Add photos to document this delivery.
              </p>
            ) : (
              <div className="ml-7 grid grid-cols-2 gap-2 mt-2">
                {deliveryPhotos.map(photo => (
                  <div key={photo.id} className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img 
                      src={photo.url} 
                      alt={photo.name} 
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex flex-col justify-between p-2">
                      <button
                        onClick={() => removePhoto(photo.id)}
                        className={`self-end bg-red-500 text-white rounded-full p-1 ${
                          deliveryStatus === "Completed" 
                            ? "hidden" 
                            : "opacity-0 group-hover:opacity-100 transition-opacity"
                        }`}
                      >
                        <MdClose className="h-3 w-3" />
                      </button>
                      <div className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 p-1 rounded">
                        {photo.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Instructions */}
          <div className="p-3 bg-gray-100 dark:bg-navy-700 rounded-lg">
            <div className="flex items-center mb-2">
              <MdAssignment className="h-5 w-5 text-brand-500 mr-2" />
              <h4 className="font-semibold text-navy-700 dark:text-white">Instructions</h4>
            </div>
            <p className="ml-7 text-gray-700 dark:text-gray-300">
              {orderData.instructions || "No special instructions for this delivery."}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={startDelivery}
              disabled={deliveryStatus === "In Progress" || deliveryStatus === "Completed"}
              className={`rounded-xl px-5 py-2 text-white ${
                deliveryStatus === "In Progress" || deliveryStatus === "Completed"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700"
              }`}
            >
              Start Delivery
            </button>
            <button
              onClick={completeDelivery}
              disabled={deliveryStatus !== "In Progress"}
              className={`rounded-xl px-5 py-2 text-white ${
                deliveryStatus !== "In Progress"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 active:bg-green-700"
              }`}
            >
              Finalize Delivery
            </button>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-brand-500 px-5 py-2 text-white hover:bg-brand-600 active:bg-brand-700"
          >
            Close
          </button>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetailsModal; 