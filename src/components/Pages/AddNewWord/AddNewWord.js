import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWordsContext } from '../../../context/GlobalState';
import { v4 } from 'uuid';
import './AddNewWord.css';
import Sidebar from '../../Sidebar/Sidebar';

const AddNewWord = () => {
  const [text, setText] = useState('');
  const context = useWordsContext();
  const { addWord } = context;
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    const newWord = { id: v4(), word: text };
    setText('');
    addWord(newWord);
    navigate(`/${newWord.id}`);
  }

  return (
    <>
      <Sidebar />
      <div className="new-word-page">
        <h2>in the beginning was the word</h2>
        <form onSubmit={onSubmit} className="form-container">
          <label className="form-control">
            <input
              type="text"
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
              placeholder="and the word was"
            ></input>
          </label>
          <button className="add-btn">+</button>
        </form>
      </div>
    </>
  );
};

export default AddNewWord;
