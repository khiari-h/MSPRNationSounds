import React, { useEffect, useState, useRef } from 'react';
import InfoCard from '../../molecules/InfoCard';
import Text from '../../atoms/Text';
import Filter from '../../atoms/Filter';
import Button from '../../atoms/Button';
import { fetchWithCache } from '../../../utils/cacheUtils'; 
import { formatDate, formatTime } from '../../../utils/formatUtilis';
import { useResponsiveItemsPerPage } from '../../../hooks/useResponsiveItemPerPage'; 

const ConcertsProgramming = ({ apiEndpoint = '/api/wordpress/concerts' }) => {
  const [concerts, setConcerts] = useState([]);
  const [filters, setFilters] = useState({ date: '', heuredebut: '', lieu: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [concertsPerPage, setConcertsPerPage] = useState(6);
  const [loading, setLoading] = useState(true); 
  const concertsListRef = useRef(null);

  // Utilisation du hook pour ajuster le nombre de concerts par page
  useResponsiveItemsPerPage(setConcertsPerPage);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const concertsData = await fetchWithCache('concerts', apiEndpoint, 3600);

        const formattedConcerts = await Promise.all(
          concertsData.map(async (concert) => {
            if (concert.acf.photo) {
              const logoData = await fetchWithCache(`logo_${concert.acf.photo}`, `/api/wordpress/media/${concert.acf.photo}`, 3600);
              concert.acf.photo = logoData.source_url;
            }
            concert.acf.date = formatDate(concert.acf.date);
            concert.acf.heuredebut = formatTime(concert.acf.heuredebut);
            concert.acf.heurefin = formatTime(concert.acf.heurefin);
            return concert;
          })
        );

        setConcerts(formattedConcerts);
      } catch (error) {
        console.error("Erreur lors de la récupération des concerts!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, [apiEndpoint]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

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
        <p>Chargement des concerts...</p> 
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
