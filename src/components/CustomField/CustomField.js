import React, { useState } from 'react';
import { useWordsContext } from '../../context/GlobalState';

export default function CustomField({ word }) {
  const context = useWordsContext();
  const { updateWord } = context;

  const [isEditing, setIsEditing] = useState(false);

  let customFieldContent;

  if (isEditing) {
    customFieldContent = (
      <>
        <label>
          <input
            type="text"
            value={word.customField}
            onChange={(event) => {
              updateWord({ ...word, customField: event.target.value });
            }}
          />
        </label>
        <button className="save-btn" onClick={() => setIsEditing(false)}>
          &#9745;
        </button>
      </>
    );
  } else if (
    typeof word.customField === 'undefined' ||
    word.customField === null ||
    word.customField === ''
  ) {
    customFieldContent = (
      <>
        <button
          className="add-btn"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          add
        </button>
      </>
    );
  } else {
    customFieldContent = (
      <>
        <p>{word.customField}</p>
        <button
          className="edit-btn"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          /
        </button>
        <button
          className="delete-btn"
          onClick={() => updateWord({ ...word, customField: null })}
        >
          &#9747;
        </button>
      </>
    );
  }

  return (
    <>
      <div className="custom-field-container">
        <div className="custom-field-wrapper">
          <div className="buttons-container">{customFieldContent}</div>
        </div>
      </div>
    </>
  );
}
