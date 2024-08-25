import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import NewsPageTemplate from '../templates/NewsPageTemplate';
import NewsCard from '../molecules/NewsCard';
import Button from '../atoms/Button';
import { useResponsiveItemsPerPage } from '../../hooks/useResponsiveItemPerPage';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [error, setError] = useState(null);

  // Hook pour ajuster le nombre d'éléments par page en fonction de la taille de l'écran
  useResponsiveItemsPerPage(setItemsPerPage);

  useEffect(() => {
    axios.get('/api/news')
      .then(response => {
        setNews(response.data.sort((a, b) => a.importance - b.importance));
        setError(null);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des actualités!", error);
        setError("Erreur lors de la récupération des actualités!");
      });
  }, []);

  const uniqueCategories = ['Tous', ...new Set(news.map(item => item.category))];
  
  const filteredNews = filter === 'Tous' ? news : news.filter(item => item.category === filter);
  const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const filterButtons = (
    <div className="flex flex-wrap justify-center mb-6">
      {uniqueCategories.map((category) => (
        <Button
          key={category}
          label={category}
          onClick={() => {
            setFilter(category);
            setCurrentPage(1);
          }}
          className={`${
            filter === category ? 'bg-blue-700' : 'bg-blue-500'
          } text-white py-2 px-4 rounded mx-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300`}
          aria-pressed={filter === category}
          aria-label={`Afficher les actualités de ${category}`}
        />
      ))}
    </div>
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationButtons = (
    <div className="flex justify-center mt-6">
      {Array.from({ length: Math.ceil(filteredNews.length / itemsPerPage) }, (_, index) => (
        <Button
          key={index}
          label={index + 1}
          onClick={() => handlePageChange(index + 1)}
        />
      ))}
    </div>
  );

  const newsItems = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paginatedNews.map((newsItem, index) => (
        <NewsCard
          key={index}
          title={newsItem.title}
          description={newsItem.description}
        />
      ))}
    </div>
  );

  return (
    <NewsPageTemplate
      title="Actualités"
      filters={filterButtons}
      newsItems={error ? <p className="text-error-red">{error}</p> : newsItems}
      pagination={paginationButtons}
    />
  );
};

export default NewsPage;
