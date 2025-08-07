import React from 'react';
import PersonCard from './PersonCard';

const PeopleGrid = ({ people }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
};

export default PeopleGrid;
