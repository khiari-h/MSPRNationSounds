import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from '../../config/axiosConfig';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Text from '../atoms/Text';
import './Map.css';
import he from 'he';
import GeolocationButton from '../atoms/GeolocationBouton';

// Suppression des icônes Leaflet par défaut
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const RoutingControl = ({ from, to, showInstructions }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!from || !to) return;

    setTimeout(() => {
      if (routingControlRef.current) {
        routingControlRef.current.setWaypoints([
          L.latLng(from[0], from[1]),
          L.latLng(to[0], to[1]),
        ]);
      } else {
        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(from[0], from[1]),
            L.latLng(to[0], to[1]),
          ],
          router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1',
            profile: 'car',
            language: 'fr',
            units: 'metric',
          }),
          routeWhileDragging: true,
          addWaypoints: false,
          draggableWaypoints: false,
          show: true,
          lineOptions: {
            styles: [{ color: 'blue', weight: 4 }],
          },
          createMarker: function (i, waypoint, n) {
            return L.marker(waypoint.latLng, {
              draggable: true,
              icon: L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
              }),
            });
          },
          formatter: new L.Routing.Formatter({
            language: 'fr',
            units: 'metric',
            roundingSensitivity: 1,
            formatInstruction: function (instruction) {
              return `<strong>${instruction.text}</strong>`;
            },
          }),
        }).addTo(map);

        routingControlRef.current.on('routesfound', function (e) {
          const routes = e.routes;
          const summary = routes[0].summary;
          console.log(`Distance: ${summary.totalDistance / 1000} km, Time: ${Math.round(summary.totalTime % 3600 / 60)} minutes`);

          const instructions = routes[0].instructions.map(instr => `<li>${instr.text}</li>`).join('');
          document.getElementById('routing-instructions').innerHTML = `<ul>${instructions}</ul>`;
        });
      }
    }, 500);

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
    };
  }, [from, to, map]);

  useEffect(() => {
    if (routingControlRef.current) {
      if (showInstructions) {
        routingControlRef.current.show();
      } else {
        routingControlRef.current.hide();
      }
    }
  }, [showInstructions]);

  return <div id="routing-instructions" className="instructions-container"></div>;
};

const CenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13); // Centrer la carte et ajuster le zoom
    }
  }, [position, map]);

  return null;
};

const Map = () => {
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [filteredPoints, setFilteredPoints] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(['Tous']);
  const [showCurrentConcerts, setShowCurrentConcerts] = useState(false);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const mapRef = useRef(null);
  

  const uniqueCategories = ['Tous', ...new Set(pointsOfInterest.map(point => point.acf.Categorie))];

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get('/api/wordpress/points-interets');
        console.log('Points d\'intérêt récupérés:', response.data);  // Pour voir les données brutes des points d'intérêt
        const decodedData = response.data.map(point => ({
          ...point,
          title: { ...point.title, rendered: he.decode(point.title.rendered) },
          acf: { ...point.acf, Description: he.decode(point.acf.Description) }
        }));
        setPointsOfInterest(decodedData);
        setFilteredPoints(decodedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des points d'intérêt!", error);
      }
    };

    fetchPoints();
  }, []);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('https://nationsounds.online/wp-json/wp/v2/concerts');
        const concertsData = response.data.map(concert => ({
          ...concert,
          title: he.decode(concert.title.rendered),
          acf: {
            ...concert.acf,
            date: formatDate(concert.acf.date), // Formatage de la date
            startDateTime: new Date(`${concert.acf.date.slice(0,4)}-${concert.acf.date.slice(4,6)}-${concert.acf.date.slice(6,8)}T${concert.acf.heuredebut}`),
            endDateTime: new Date(`${concert.acf.date.slice(0,4)}-${concert.acf.date.slice(4,6)}-${concert.acf.date.slice(6,8)}T${concert.acf.heurefin}`)
          }
        }));
        setConcerts(concertsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des concerts!", error);
      }
    };

    fetchConcerts();
  }, []);

  useEffect(() => {
    if (selectedCategories.includes('Tous')) {
      setFilteredPoints(pointsOfInterest);
    } else {
      setFilteredPoints(pointsOfInterest.filter(point => selectedCategories.includes(point.acf.Categorie)));
    }
  }, [selectedCategories, pointsOfInterest]);

  useEffect(() => {
    let points = pointsOfInterest;
    if (showCurrentConcerts) {
      const now = new Date();
      points = points.filter(point => {
        const concertsForPoint = concerts.filter(c => c.acf.lieu === point.acf.nom);
        return concertsForPoint.some(concert => {
          const concertStart = concert.acf.startDateTime;
          const concertEnd = concert.acf.endDateTime;
          return concertStart <= now && now <= concertEnd;
        });
      });
    }
    setFilteredPoints(points);
  }, [showCurrentConcerts, pointsOfInterest, concerts]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (value === 'Tous') {
      setSelectedCategories(checked ? ['Tous'] : []);
    } else {
      setSelectedCategories(prev =>
        checked ? [...prev.filter(cat => cat !== 'Tous'), value] : prev.filter(cat => cat !== value)
      );
    }
  };

  const handleRouteChange = (e, type) => {
    const [lat, lng] = e.target.value.split(',');
    const location = [parseFloat(lat), parseFloat(lng)];

    if (type === 'start') {
      setStartLocation(location);
    } else {
      setEndLocation(location);
    }
  };

  const handleGeolocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Latitude:', latitude, 'Longitude:', longitude);
          setUserPosition([latitude, longitude]);
          setStartLocation([latitude, longitude]);
          alert('Position géographique détectée.');
        },
        (error) => {
          console.error('Erreur de géolocalisation : ', error);
          alert('Impossible de détecter votre position.');
        }
      );
    } else {
      alert('La géolocalisation n\'est pas supportée par ce navigateur.');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return dateStr;
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${day}/${month}/${year}`;
};


  return (
    <div className="container mx-auto p-4">
      <Text content="Carte du Festival" type="h2" className="text-3xl font-bold mb-6 text-center" />

      <div className="flex flex-wrap justify-center mb-4 space-x-4">
        {uniqueCategories.map(category => (
          <label key={category} className="inline-flex items-center">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-black">{category}</span>
          </label>
        ))}
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={showCurrentConcerts}
            onChange={() => setShowCurrentConcerts(!showCurrentConcerts)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-black">Afficher concerts en cours</span>
        </label>
      </div>

      <div className="flex flex-wrap justify-center mb-4">
        <div className="mr-2">
          <label htmlFor="start-select" className="sr-only">Point de départ</label>
          <select
            id="start-select"
            value={startLocation ? startLocation.join(',') : ''}
            onChange={(e) => handleRouteChange(e, 'start')}
            className="p-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Sélectionner un point de départ</option>
            {userPosition && (
              <option value={userPosition.join(',')}>Votre position actuelle</option>
            )}
            {filteredPoints.map((point, index) => (
              <option key={index} value={`${point.acf.Latitude},${point.acf.Longitude}`}>
                {point.title.rendered}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="end-select" className="sr-only">Point d'arrivée</label>
          <select
            id="end-select"
            value={endLocation ? endLocation.join(',') : ''}
            onChange={(e) => handleRouteChange(e, 'end')}
            className="p-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Sélectionner un point d'arrivée</option>
            {filteredPoints.map((point, index) => (
              <option key={index} value={`${point.acf.Latitude},${point.acf.Longitude}`}>
                {point.title.rendered}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={() => setShowInstructions(!showInstructions)}
        className="mb-4 px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
   <i className={`fa ${showInstructions ? 'fa-toggle-on' : 'fa-toggle-off'}`} style={{ backgroundColor: 'blue', color: 'white', padding: '5px', borderRadius: '50%' }}></i>



      </button>

      <div className="map-container-wrapper relative">
        <MapContainer
          center={[48.8566, 2.3522]}
          zoom={13}
          className="map-container"
          style={{ height: "80vh", width: "100%" }}
          whenCreated={mapInstance => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredPoints.map((point, index) => (
            <Marker
              key={index}
              position={[point.acf.Latitude, point.acf.Longitude]}
              icon={new L.Icon({
                iconUrl: require('leaflet/dist/images/marker-icon.png'),
                shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
                iconSize: [25, 41],
                iconAnchor: [12, 41]
              })}
            >
<Popup>
    <strong>{point.title.rendered}</strong><br />
    {point.acf.Description}<br />
    Catégorie: {point.acf.Categorie}
    {showCurrentConcerts && concerts
  .filter(c => c.acf.lieu === point.acf.nom && new Date(c.acf.startDateTime) <= new Date() && new Date() <= new Date(c.acf.endDateTime))
  .map((concert, idx) => (
    <div key={idx} className="mt-4">
      <hr />
      <span className="text-red-500 font-bold">Concerts en cours</span><br />
      <strong>{concert.title}</strong><br />
      {concert.acf.description}<br />
      Date: {concert.acf.date}<br />
      Heure début: {concert.acf.heuredebut}<br />
      Heure fin: {concert.acf.heurefin}
    </div>
  ))}

</Popup>

            </Marker>
          ))}
          {startLocation && endLocation && (
            <RoutingControl from={startLocation} to={endLocation} showInstructions={showInstructions} />
          )}
          {userPosition && (
            <Marker
              position={userPosition}
              icon={new L.Icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
              })}
            >
              <Popup>
                <strong>Votre position</strong>
              </Popup>
            </Marker>
          )}
          <GeolocationButton onClick={handleGeolocationClick} />
          <CenterMap position={userPosition} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
