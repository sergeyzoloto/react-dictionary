import React, { useState } from 'react';
import { useWordsContext } from '../../context/GlobalState';

export default function CustomField({ word }) {
  const context = useWordsContext();
  const { updateWord } = context;

  const [isEditing, setIsEditing] = useState(false);

  let customFieldContent;

  const deleteButton = (
    <label>
      <button onClick={() => updateWord({ ...word, customField: null })}>
        delete
      </button>
    </label>
  );

  if (isEditing) {
    customFieldContent = (
      <>
        <input
          value={word.customField ? word.customField : ''}
          onChange={(event) => {
            updateWord({ ...word, customField: event.target.value });
          }}
        />
        <button onClick={() => setIsEditing(false)}>save</button>
        {deleteButton}
      </>
    );
  } else if (
    typeof word.customField !== 'undefined' ||
    word.customField === null ||
    word.customField !== ''
  ) {
    customFieldContent = (
      <>
        <label>
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            add
          </button>
        </label>
      </>
    );
  } else {
    customFieldContent = (
      <>
        <p>{word.customField}</p>
        <label>
          <button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            change
          </button>
        </label>
        {deleteButton}
      </>
    );
  }

  return (
    <div className="custom-field-container">
      <p>translate</p>
      {customFieldContent}
    </div>
  );
}
