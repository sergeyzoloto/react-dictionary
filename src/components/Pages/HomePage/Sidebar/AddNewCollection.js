import React, { useState } from 'react';
import { useWordsContext } from '../../../../context/GlobalState';
import { v4 } from 'uuid';

function AddNewCollection() {
  const [text, setText] = useState('');
  const context = useWordsContext();
  const { addCollection } = context;

  function onSubmit(event) {
    event.preventDefault();
    const newCollection = { id: v4(), title: text, words: [] };
    addCollection(newCollection);
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="form-container">
        <div className="form-control">
          <input
            type="text"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
            placeholder="Enter text"
          ></input>
        </div>
        <button>+</button>
      </form>
    </div>
  );
}

export default AddNewCollection;
