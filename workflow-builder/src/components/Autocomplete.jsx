import React, { useState } from 'react';

const Autocomplete = ({ value, onChange, suggestions, name }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const userInput = e.currentTarget.value;
    const newFilteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInputValue(userInput);
    setFilteredSuggestions(newFilteredSuggestions);
    setShowSuggestions(true);
  };

  const onClick = (suggestion) => {
    setInputValue(suggestion.name);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    onChange({ target: { name, value: suggestion.id } });
  };

  const renderSuggestions = () => {
    if (showSuggestions && inputValue) {
      if (filteredSuggestions.length) {
        return (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <li key={suggestion.id} onClick={() => onClick(suggestion)}>
                  {suggestion.name}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <>
      <input
        type="text"
        onChange={handleChange}
        value={inputValue}
      />
      {renderSuggestions()}
      <style>{`
        .suggestions {
          border: 1px solid #999;
          border-top-width: 0;
          list-style: none;
          margin-top: 0;
          max-height: 143px;
          overflow-y: auto;
          padding-left: 0;
          width: calc(300px - 1rem);
        }
        .suggestions li {
          padding: 0.5rem;
        }
        .suggestions li:hover {
          background-color: #008f68;
          color: #fae042;
          cursor: pointer;
          font-weight: 700;
        }
        .suggestions li:not(:last-of-type) {
          border-bottom: 1px solid #999;
        }
        .no-suggestions {
          color: #999;
          padding: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default Autocomplete;
