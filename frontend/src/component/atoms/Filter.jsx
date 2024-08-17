import React from 'react';
import Button from './Button';

const Filter = ({ data, filters, filterKeys, handleFilterChange, resetFilters }) => {
 
  const uniqueOptions = React.useMemo(() => {
    const options = {};
    filterKeys.forEach((key) => {
      options[key] = [...new Set(data.map(item => item[key]))];
    });
    return options;
  }, [data, filterKeys]);

 
  const displayLabels = {
    group: 'Groupes',
    date: 'Dates',
    heuredebut: 'Heures',
    lieu: 'Lieux',
    type: 'Types'
  };

  return (
    <div className="mb-6">
      <form className="flex flex-wrap justify-center space-x-4 items-center bg-green-100 p-4 rounded-lg shadow-md">
        {filterKeys.map((key) => (
          <div key={key} className="w-full sm:w-auto mb-2 sm:mb-0">
            <select
              id={key}
              name={key}
              value={filters[key] || ''}
              onChange={(e) => handleFilterChange(key, e.target.value)}
              className="mt-1 block w-full p-2 border border-green-300 rounded-md text-green-800 bg-white"
              style={{ minWidth: '150px' }} 
            >
              <option value="">{displayLabels[key] || key.charAt(0).toUpperCase() + key.slice(1)}</option>
              {uniqueOptions[key].map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          </div>
        ))}
        <div className="mt-1 sm:mt-0">
          <Button 
            onClick={resetFilters} 
            label="Réinitialiser les filtres" 
            type="button" 
          />
        </div>
      </form>
    </div>
  );
};

export default Filter;
