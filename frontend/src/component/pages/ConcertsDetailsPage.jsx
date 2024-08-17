import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import ConcertsDetailsPageTemplate from '../templates/ConcertsDetailsPageTemplate';
import InfoCard from '../molecules/InfoCard';
import Filter from '../atoms/Filter';
import Button from '../atoms/Button'; 

const ConcertsDetailsPage = () => {
  const [concerts, setConcerts] = useState([]);
  const [filters, setFilters] = useState({ group: '', date: '', lieu: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [concertsPerPage, setConcertsPerPage] = useState(6);

  const formatDate = (dateStr) => {
    if (!dateStr) return dateStr;
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return timeStr;
    const [hour, minute] = timeStr.split(':');
    return `${hour}:${minute}`;
  };

  useEffect(() => {
    const handleResize = () => {
      setConcertsPerPage(window.innerWidth < 768 ? 3 : 6);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to set concertsPerPage based on screen size
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('/api/wordpress/concerts');
        const concertsData = response.data;

        const concertsWithDetails = await Promise.all(concertsData.map(async concert => {
          if (concert.acf.photo) {
            const mediaResponse = await axios.get(`https://nationsounds.online/wp-json/wp/v2/media/${concert.acf.photo}`);
            concert.acf.photo = mediaResponse.data.source_url;
          }
          concert.acf.date = formatDate(concert.acf.date);
          concert.acf.heuredebut = formatTime(concert.acf.heuredebut);
          concert.acf.heurefin = formatTime(concert.acf.heurefin);
          return concert;
        }));

        setConcerts(concertsWithDetails);
      } catch (error) {
        console.error("Erreur lors de la récupération des concerts!", error);
      }
    };

    fetchConcerts();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
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
                className="mx-1"
                label={String(index + 1)}
              />
            ))}
          </div>
        </>
      }
    />
  );
};

export default ConcertsDetailsPage;
