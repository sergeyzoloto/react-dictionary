import React from 'react';
import { useParams } from 'react-router';

const WordPage = () => {
  const { id } = useParams();
  return (
    <>
      <h3>WordPage: {id}</h3>
    </>
  );
};

export default WordPage;
