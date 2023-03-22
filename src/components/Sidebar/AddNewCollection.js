import React, { useState } from 'react';
import { useWordsContext } from '../../context/GlobalState.js';
import { v4 } from 'uuid';

function AddNewCollection() {
  const [text, setText] = useState('');
  const context = useWordsContext();
  const { addCollection } = context;

  function onSubmit(event) {
    event.preventDefault();
    const newCollection = { id: v4(), title: text, words: [] };
    addCollection(newCollection);
    setText('');
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="form-control"
        id="new-collection-form"
      >
        <label>
          <input
            type="text"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
            placeholder="new collection"
          ></input>
        </label>
        <button className="add-btn">+</button>
      </form>
    </>
  );
}

export default AddNewCollection;
