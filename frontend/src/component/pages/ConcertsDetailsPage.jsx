import React, { useEffect, useState } from 'react';
import ConcertsDetailsPageTemplate from '../templates/ConcertsDetailsPageTemplate';
import InfoCard from '../molecules/InfoCard';
import Filter from '../atoms/Filter';
import Button from '../atoms/Button'; 
import { fetchWithCache } from '../../utils/cacheUtils';
import { formatDate, formatTime } from '../../utils/formatUtilis';
import { useResponsiveItemsPerPage } from '../../hooks/useResponsiveItemPerPage';

const ConcertsDetailsPage = () => {
  const [concerts, setConcerts] = useState([]);
  const [filters, setFilters] = useState({ group: '', date: '', lieu: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [concertsPerPage, setConcertsPerPage] = useState(6);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  
  useResponsiveItemsPerPage(setConcertsPerPage);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const concertsData = await fetchWithCache('concertsDetails', '/api/wordpress/concerts', 3600);

        const concertsWithDetails = await Promise.all(concertsData.map(async concert => {
          if (concert.acf.photo) {
            const logoData = await fetchWithCache(`logo_${concert.acf.photo}`, `https://nationsounds.online/wp-json/wp/v2/media/${concert.acf.photo}`, 3600);
            concert.acf.photo = logoData.source_url;
          }
          concert.acf.date = formatDate(concert.acf.date);
          concert.acf.heuredebut = formatTime(concert.acf.heuredebut);
          concert.acf.heurefin = formatTime(concert.acf.heurefin);
          return concert;
        }));

        setConcerts(concertsWithDetails);
      } catch (error) {
        console.error("Erreur lors de la récupération des concerts!", error);
        setError("Une erreur est survenue lors de la récupération des concerts. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false); 
      }
    };

    fetchConcerts();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ group: '', date: '', lieu: '', type: '' });
  };

  const filteredConcerts = concerts.filter(concert => {
    return (
      (filters.group === '' || concert.acf.nom === filters.group) &&
      (filters.date === '' || concert.acf.date === filters.date) &&
      (filters.lieu === '' || concert.acf.lieu === filters.lieu) &&
      (filters.type === '' || concert.acf.type === filters.type)
    );
  });

  const indexOfLastConcert = currentPage * concertsPerPage;
  const indexOfFirstConcert = indexOfLastConcert - concertsPerPage;
  const currentConcerts = filteredConcerts.slice(indexOfFirstConcert, indexOfLastConcert);
  const totalPages = Math.ceil(filteredConcerts.length / concertsPerPage);

  return (
    <ConcertsDetailsPageTemplate
      filters={
        <Filter
          data={concerts.map(concert => ({
            group: concert.acf.nom,
            date: concert.acf.date,
            lieu: concert.acf.lieu,
            type: concert.acf.type,
          }))}
          filters={filters}
          filterKeys={['group', 'date', 'lieu', 'type']}
          handleFilterChange={handleFilterChange}
          resetFilters={resetFilters}
        />
      }
      concerts={
        <>
          {loading ? (
            <p>Chargement des concerts...</p>
          ) : error ? (
            <p className="text-error-red">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentConcerts.map((concert, index) => (
                  <InfoCard
                    key={index}
                    title={concert.acf.nom}
                    description={concert.acf.description}
                    image={concert.acf.photo}
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
                    isSelected={currentPage === index + 1}
                    className="mx-1"
                    label={String(index + 1)}
                  />
                ))}
              </div>
            </>
          )}
        </>
      }
    />
  );
};

export default ConcertsDetailsPage;
