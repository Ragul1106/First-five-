import React, { useState } from 'react';
import 'animate.css';

const emojiDictionary = {
  "😀": "Grinning Face",
  "😂": "Face With Tears of Joy",
  "😍": "Smiling Face with Heart-Eyes",
  "😎": "Smiling Face with Sunglasses",
  "😢": "Crying Face",
  "🥺": "Pleading Face",
  "🤔": "Thinking Face",
  "🙃": "Upside-Down Face",
  "😡": "Pouting Face",
  "🎉": "Party Popper",
};

const EmojiInterpreter = () => {
  const [emojiInput, setEmojiInput] = useState('');
  const [meaning, setMeaning] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value.trim();
    setEmojiInput(input);
    if (emojiDictionary[input]) {
      setMeaning(emojiDictionary[input]);
      setError(false);
    } else {
      setMeaning('Emoji not found in dictionary');
      setError(true);
    }
  };

  const handleEmojiClick = (emoji) => {
    setEmojiInput(emoji);
    setMeaning(emojiDictionary[emoji]);
    setError(false);
  };

  const handleClear = () => {
    setEmojiInput('');
    setMeaning('');
    setError(false);
  };

  return (
    <div className="text-center animate__animated animate__fadeIn">
      <h2 className="mb-4">🧭 Emoji Interpreter</h2>

      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '400px' }}>
        <input
          type="text"
          className={`form-control form-control-lg text-center fs-3 mb-3 ${error ? 'is-invalid' : 'is-valid'}`}
          placeholder="Enter emoji here 😎"
          value={emojiInput}
          onChange={handleChange}
        />

        {meaning && (
          <div className={`fs-5 fw-bold mb-3 animate__animated ${error ? 'animate__shakeX text-danger' : 'animate__fadeInDown text-success'}`}>
            {meaning}
          </div>
        )}

        {emojiInput && (
          <button className="btn btn-outline-danger btn-sm w-100" onClick={handleClear}>
            🔄 Clear
          </button>
        )}
      </div>

      <h5 className="mt-4 mb-3">Try clicking on these:</h5>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {Object.keys(emojiDictionary).map((emoji) => (
          <span
            key={emoji}
            onClick={() => handleEmojiClick(emoji)}
            title={emojiDictionary[emoji]}
            className="fs-3"
            style={{
              cursor: 'pointer',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              background: '#f1f3f5',
              transition: '0.2s ease-in-out',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              userSelect: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#d0ebff')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#f1f3f5')}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EmojiInterpreter;
