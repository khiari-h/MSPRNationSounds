import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import InfoCard from '../molecules/InfoCard';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { useResponsiveDisplay } from '../../hooks/useResponsiveDisplay'; // Import the custom hook

const ProgrammingOverview = () => {
  const [data, setData] = useState({ concert: null, artistMeetings: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const displayCount = useResponsiveDisplay(); // Use the custom hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/wordpress/programming-homepage');
        const { concert, artists_meetings } = response.data;

        // Fetch concert photo
        if (concert?.acf?.photo) {
          const concertPhotoResponse = await axios.get(`/api/wordpress/media/${concert.acf.photo}`);
          concert.acf.photo_url = concertPhotoResponse.data.source_url;
        }

        // Fetch artist meetings photos
        const artistMeetingsWithPhotos = await Promise.all(
          artists_meetings.map(async (meeting) => {
            if (meeting.acf.photo) {
              const meetingPhotoResponse = await axios.get(`/api/wordpress/media/${meeting.acf.photo}`);
              meeting.acf.photo_url = meetingPhotoResponse.data.source_url;
            }
            return meeting;
          })
        );

        setData({ concert, artistMeetings: artistMeetingsWithPhotos });
        setLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = [data.concert, ...data.artistMeetings].filter(item => item !== null).slice(0, displayCount);

  return (
    <section className="container mx-auto py-8" aria-labelledby="programming-overview-heading">
      <Text content="Programmation" type="h2" className="text-2xl font-bold mb-6 text-center" id="programming-overview-heading" />
      {loading && <p>Chargement...</p>}
      {error && <p className="text-error-red">{error}</p>}
      {!loading && !error && (
        <div className={`grid grid-cols-1 ${displayCount === 2 ? 'md:grid-cols-2' : ''} ${displayCount === 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
          {filteredData.map((item, index) => (
            <InfoCard
              key={index}
              title={item.acf.nom}
              description={item.acf.description}
              image={item.acf.photo_url || 'default.jpg'}
              type={item.acf.type === 'concert' ? 'program' : 'meeting'}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          label="Voir Plus"
          href="/programmation"
          aria-label="Voir toute la programmation"
        />
      </div>
    </section>
  );
};

export default ProgrammingOverview;
