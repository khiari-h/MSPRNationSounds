import React, { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import InfoCard from '../../molecules/InfoCard';
import Text from '../../atoms/Text';
import Filter from '../../atoms/Filter';
import Button from '../../atoms/Button';
import { fetchWithCache } from '../../../utils/cacheUtils'; 
import {formatDate, formatTime } from '../../../utils/formatUtilis'; 
import { useResponsiveItemsPerPage } from '../../../hooks/useResponsiveItemPerPage';

const ArtistMeeting = ({ apiEndpoint = '/api/wordpress/artists_meetings' }) => {
  const [artistMeetings, setArtistMeetings] = useState([]);
  const [filters, setFilters] = useState({ date: '', heuredebut: '', lieu: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [meetingsPerPage, setMeetingsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);

  // Utilisation du hook pour ajuster le nombre de meetings par page
  useResponsiveItemsPerPage(setMeetingsPerPage);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const meetingsData = await fetchWithCache('artistMeetings', apiEndpoint, 3600);

        const formattedMeetings = await Promise.all(
          meetingsData.map(async (meeting) => {
            if (meeting.acf.photo) {
              const logoData = await fetchWithCache(`logo_${meeting.acf.photo}`, `/api/wordpress/media/${meeting.acf.photo}`, 3600);
              meeting.acf.photo = logoData.source_url;
            }
            meeting.acf.date = formatDate(meeting.acf.date);
            meeting.acf.heuredebut = formatTime(meeting.acf.heuredebut);
            meeting.acf.heurefin = formatTime(meeting.acf.heurefin);
            return meeting;
          })
        );

        setArtistMeetings(formattedMeetings);
      } catch (error) {
        console.error("Erreur lors de la récupération des rencontres!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [apiEndpoint]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const filteredMeetings = artistMeetings.filter((meeting) => {
    return (
      (filters.date === '' || meeting.acf.date === filters.date) &&
      (filters.heuredebut === '' || meeting.acf.heuredebut === filters.heuredebut) &&
      (filters.lieu === '' || meeting.acf.lieu === filters.lieu) &&
      (filters.type === '' || meeting.acf.type === filters.type)
    );
  });

  const indexOfLastMeeting = currentPage * meetingsPerPage;
  const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
  const currentMeetings = filteredMeetings.slice(indexOfFirstMeeting, indexOfLastMeeting);
  const totalPages = Math.ceil(filteredMeetings.length / meetingsPerPage);

  return (
    <section className="container mx-auto py-8" aria-labelledby="artist-meetings-heading">
      <Text content="Rencontres avec les Artistes" type="h1" className="text-concert-title text-center" id="artist-meetings-heading" />
      {loading ? (
        <p>Chargement des rencontres...</p>
      ) : (
        <>
          {filteredMeetings.length === 0 ? (
            <p>Aucune rencontre trouvée avec les critères sélectionnés.</p>
          ) : (
            <>
              <Filter
                data={artistMeetings.map(meeting => ({
                  date: meeting.acf.date,
                  heuredebut: meeting.acf.heuredebut,
                  lieu: meeting.acf.lieu,
                  type: meeting.acf.type,
                }))}
                filters={filters}
                filterKeys={['date', 'heuredebut', 'lieu', 'type']}
                handleFilterChange={handleFilterChange}
                resetFilters={() => setFilters({ date: '', heuredebut: '', lieu: '', type: '' })}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentMeetings.map((meeting, index) => (
                  <InfoCard
                    key={index}
                    title={meeting.acf.nom}
                    description={meeting.acf.description}
                    image={meeting.acf.photo || 'default.jpg'}
                    additionalInfo={`Date: ${meeting.acf.date}, Heure de début: ${meeting.acf.heuredebut}, Heure de fin: ${meeting.acf.heurefin}, Lieu: ${meeting.acf.lieu}, Type: ${meeting.acf.type}`}
                    type="meeting"
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

export default ArtistMeeting;
