import React, { useEffect, useState, useRef } from 'react';
import axios from '../../../config/axiosConfig';
import InfoCard from '../../molecules/InfoCard';
import Text from '../../atoms/Text';
import Filter from '../../atoms/Filter';
import Button from '../../atoms/Button';

const ConcertsProgramming = ({ apiEndpoint = '/api/wordpress/concerts' }) => {
  const [concerts, setConcerts] = useState([]);
  const [filters, setFilters] = useState({ date: '', heuredebut: '', lieu: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [concertsPerPage, setConcertsPerPage] = useState(6);
  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement
  const concertsListRef = useRef(null);

  // Fonction de formatage de la date
  const formatDate = (dateStr) => {
    if (!dateStr) return dateStr;
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${day}/${month}/${year}`;
  };

  // Fonction de formatage de l'heure
  const formatTime = (timeStr) => {
    if (!timeStr) return timeStr;
    const [hour, minute] = timeStr.split(':');
    return `${hour}:${minute}`;
  };

  // Ajustement du nombre de concerts par page en fonction de la taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      setConcertsPerPage(window.innerWidth < 768 ? 3 : 6);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Appel initial pour définir la valeur

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Récupération des concerts depuis l'API
  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        const concertsData = await Promise.all(
          response.data.map(async (concert) => {
            if (concert.acf.photo) {
              const mediaResponse = await axios.get(`/api/wordpress/media/${concert.acf.photo}`);
              concert.acf.photo = mediaResponse.data.source_url;
            }
            concert.acf.date = formatDate(concert.acf.date);
            concert.acf.heuredebut = formatTime(concert.acf.heuredebut);
            concert.acf.heurefin = formatTime(concert.acf.heurefin);
            return concert;
          })
        );

        setConcerts(concertsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des concerts!", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchConcerts();
  }, [apiEndpoint]);

  // Gestion des changements de filtres
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  // Application des filtres
  const filteredConcerts = concerts.filter((concert) => {
    return (
      (filters.date === '' || concert.acf.date === filters.date) &&
      (filters.heuredebut === '' || concert.acf.heuredebut === filters.heuredebut) &&
      (filters.lieu === '' || concert.acf.lieu === filters.lieu) &&
      (filters.type === '' || concert.acf.type === filters.type)
    );
  });

  const indexOfLastConcert = currentPage * concertsPerPage;
  const indexOfFirstConcert = indexOfLastConcert - concertsPerPage;
  const currentConcerts = filteredConcerts.slice(indexOfFirstConcert, indexOfLastConcert);
  const totalPages = Math.ceil(filteredConcerts.length / concertsPerPage);

  return (
    <section className="container mx-auto py-8" aria-labelledby="concerts-programming-heading">
      <Text content="Programmation des Concerts" type="h1" className="text-concert-title text-center" id="concerts-programming-heading" />
      {loading ? (
        <p>Chargement des concerts...</p> // Afficher un message de chargement pendant le fetch
      ) : (
        <>
          {filteredConcerts.length === 0 ? (
            <p>Aucun concert trouvé avec les critères sélectionnés.</p>
          ) : (
            <>
              <Filter
                data={concerts.map(concert => ({
                  date: concert.acf.date,
                  heuredebut: concert.acf.heuredebut,
                  lieu: concert.acf.lieu,
                  type: concert.acf.type,
                }))}
                filters={filters}
                filterKeys={['date', 'heuredebut', 'lieu', 'type']}
                handleFilterChange={handleFilterChange}
                resetFilters={() => setFilters({ date: '', heuredebut: '', lieu: '', type: '' })}
              />
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                tabIndex="-1" 
                ref={concertsListRef} 
                aria-label="Liste des concerts"
              >
                {currentConcerts.map((concert, index) => (
                  <InfoCard
                    key={index}
                    title={concert.acf.nom}
                    description={concert.acf.description}
                    image={concert.acf.photo || 'default.jpg'}
                    additionalInfo={`Date: ${concert.acf.date}, Heure de début: ${concert.acf.heuredebut}, Heure de fin: ${concert.acf.heurefin}, Lieu: ${concert.acf.lieu}, Type: ${concert.acf.type}`}
                    type="program"
                  />
                ))}
              </div>
              <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                  <Button 
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    label={String(index + 1)}
                    className="mx-1"
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default ConcertsProgramming;
