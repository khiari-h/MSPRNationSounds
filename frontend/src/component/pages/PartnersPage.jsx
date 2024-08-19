import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import PartnersPageTemplate from '../templates/PartnersPageTemplate';
import Text from '../atoms/Text';
import PartnerCard from '../molecules/PartnersCard';
import Button from '../atoms/Button';
import { fetchWithCache } from '../../utils/cacheUtils';
import { useResponsiveItemsPerPage } from '../../hooks/useResponsiveItemPerPage';

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Use the custom hook to determine the number of items per page
  const partnersPerPage = useResponsiveItemsPerPage(6, 3, 6);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const partnersData = await fetchWithCache('partners', '/api/wordpress/partners', 3600);

        if (partnersData.length === 0) {
          setError('Aucun partenaire trouvé.');
          setLoading(false);
          return;
        }

        const partnersWithLogos = await Promise.all(
          partnersData.map(async (partner) => {
            if (partner.acf.logo) {
              try {
                const logoData = await fetchWithCache(`logo_${partner.acf.logo}`, `/api/wordpress/media/${partner.acf.logo}`, 3600);
                return { ...partner, acf: { ...partner.acf, logoUrl: logoData.source_url } };
              } catch (logoError) {
                console.error("Erreur lors de la récupération du logo!", logoError);
                return { ...partner, acf: { ...partner.acf, logoUrl: '' } };
              }
            }
            return { ...partner, acf: { ...partner.acf, logoUrl: '' } };
          })
        );

        setPartners(partnersWithLogos);
        setFilteredPartners(partnersWithLogos);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des partenaires!", error);
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const categories = ['Tous', ...new Set(partners.map(partner => partner.acf?.categorie || ''))];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === 'Tous') {
      setFilteredPartners(partners);
    } else {
      setFilteredPartners(partners.filter(partner => partner.acf?.categorie === category));
    }
  };

  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = filteredPartners.slice(indexOfFirstPartner, indexOfLastPartner);
  const totalPages = Math.ceil(filteredPartners.length / partnersPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filters = (
    <div className="flex flex-wrap justify-center mb-6 space-x-2 space-y-2 sm:space-x-4 sm:space-y-0">
      {categories.map((category, index) => (
        <Button
          key={index}
          label={category}
          onClick={() => handleCategoryChange(category)}
          isSelected={selectedCategory === category}
          aria-pressed={selectedCategory === category}
        />
      ))}
    </div>
  );

  const partnersSection = (
    <section className="mb-12">
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredPartners.length === 0 ? (
        <p>Aucun partenaire disponible pour cette catégorie.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPartners.map((partner, index) => (
              <PartnerCard
                key={index}
                name={partner.acf.nom}
                logo={partner.acf.logoUrl}
                link={partner.acf.lien}
                description={partner.acf.description}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                label={index + 1}
                onClick={() => handleClick(index + 1)}
                isSelected={currentPage === index + 1}
                className="mx-1"
              />
            ))}
          </div>
        </>
      )}
    </section>
  );

  const ctaSection = (
    <div className="mt-12 text-center">
      <Text content="Vous souhaitez devenir partenaire ?" type="h2" className="h2-class mb-4" aria-label="Vous souhaitez devenir partenaire ?" />
      <Button
        label="Envoyez-nous un email"
        onClick={() => window.location.href = 'mailto:partenariats@nationsounds.com'}
        className="bg-custom-blue-500 hover:bg-custom-blue-700 text-white font-bold py-2 px-4 rounded transition-colors durée-300"
        aria-label="Envoyez-nous un email pour devenir partenaire"
      />
    </div>
  );

  const messageSection = (
    <div className="bg-custom-yellow-500 p-4 rounded-lg mb-6 text-center">
      <Text content="Profitez de 10% de réduction chez nos partenaires principaux !" type="h2" className="text-xl font-semibold" />
    </div>
  );

  return (
    <PartnersPageTemplate
      filters={filters}
      partners={partnersSection}
      cta={ctaSection} 
      message={messageSection}
    />
  );
};

export default PartnersPage;
