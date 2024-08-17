import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import Button from '../atoms/Button';
import NewsCard from '../molecules/NewsCard';

const NewsAndUpdates = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(3); // Par défaut, on affiche 3 articles

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des actualités!", error);
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const updateDisplayCount = () => {
      if (window.innerWidth < 768) {
        setDisplayCount(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setDisplayCount(2); // Tablette
      } else {
        setDisplayCount(3); // Desktop
      }
    };

    updateDisplayCount(); // Exécution initiale
    window.addEventListener('resize', updateDisplayCount);

    return () => window.removeEventListener('resize', updateDisplayCount);
  }, []);

  return (
    <section className="container mx-auto py-8" aria-labelledby="news-updates-heading">
      <h1 id="news-updates-heading" className="h1-class mb-8 text-center">Actualités</h1>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-error-red">{error}</p>}
      {!loading && !error && (
        <>
          <div className={`grid grid-cols-1 ${displayCount === 2 ? 'md:grid-cols-2' : ''} ${displayCount === 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
            {news.slice(0, displayCount).map((newsItem, index) => (
              <NewsCard
                key={index}
                title={newsItem.title}
                description={newsItem.description}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/news" label="Voir toutes les actualités" />
          </div>
        </>
      )}
    </section>
  );
};

export default NewsAndUpdates;
