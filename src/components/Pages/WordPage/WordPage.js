import React from 'react';
import { useParams } from 'react-router';
import { useWordsContext } from '../../../context/GlobalState';

const WordPage = () => {
  const { id } = useParams();
  const context = useWordsContext();
  const { data } = context;
  const word = data.words.filter((word) => {
    return word.id === id;
  })[0];

  return (
    <>
      <h3>{word.word}</h3>
    </>
  );
};

export default WordPage;
