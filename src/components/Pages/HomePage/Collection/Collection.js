import React, { useState, useEffect } from 'react';
import { useWordsContext } from '../../../../context/GlobalState';
import { removeDuplicates } from '../../../../utils/removeDuplicates';
import Word from '../../../Word/Word.js';

const Collection = () => {
  const context = useWordsContext();
  const { data, getCollections } = context;

  const [selectedWords, setSelectedWords] = useState(data.words);

  useEffect(() => {
    getCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const selectedCollections = data.collections.filter((item) => {
      return item.isActive === true;
    });
    const selectedWordsArrays = selectedCollections.map((item) => {
      return item.words;
    });

    let selectedWordsIndexes = [];
    selectedWordsArrays.forEach((words) => {
      words.forEach((item) => {
        selectedWordsIndexes.push(item);
      });
    });

    const selectedUniqueIndexes = removeDuplicates(selectedWordsIndexes);

    const result = data.words.filter((item) => {
      return selectedUniqueIndexes.includes(item.id);
    });

    if (result.length === 0) {
      setSelectedWords(data.words);
    } else {
      setSelectedWords(result);
    }
  }, [data]);

  return (
    <>
      <div className="collection-list">
        <h3>Selected collection</h3>
        {selectedWords.map((word) => {
          return <Word word={word} key={word.id} />;
        })}
      </div>
    </>
  );
};

export default Collection;
