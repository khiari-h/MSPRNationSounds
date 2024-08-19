import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import InfoCard from '../molecules/InfoCard';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { useResponsiveDisplay } from '../../hooks/useResponsiveDisplay'; // Import the custom hook

const ConcertsOverview = ({ showMoreButton = true, heading = "Planning des Concerts" }) => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const displayCount = useResponsiveDisplay(); // Use the custom hook

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('/api/wordpress/concerts-homepage');
        const concertsData = response.data;

        // Fetch photos for each concert
        const concertsWithPhotos = await Promise.all(
          concertsData.map(async (concert) => {
            if (concert.acf.photo) {
              const photoResponse = await axios.get(`/api/wordpress/media/${concert.acf.photo}`);
              concert.acf.photo_url = photoResponse.data.source_url;
            }
            return concert;
          })
        );

        setConcerts(concertsWithPhotos);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des concerts.");
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  return (
    <section className="container mx-auto py-8" aria-labelledby="concerts-overview-heading">
      <Text content={heading} type="h2" className="text-2xl font-bold mb-6 text-center" id="concerts-overview-heading" />
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <div className={`grid grid-cols-1 ${displayCount === 2 ? 'md:grid-cols-2' : ''} ${displayCount === 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
            {concerts.slice(0, displayCount).map((concert, index) => (
              <InfoCard
                key={index}
                title={concert.acf.nom}
                description={concert.acf.description}
                image={concert.acf.photo_url || 'default.jpg'}
              />
            ))}
          </div>
          {showMoreButton && (
            <div className="flex justify-center mt-6 space-x-4">
              <Button
                label="Voir Plus de Concerts"
                href="/concerts"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                aria-label="Voir tous les concerts"
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ConcertsOverview;
