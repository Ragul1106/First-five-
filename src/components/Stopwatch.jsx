import React, { useState, useRef } from 'react';
import '../assets/css/Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (secs) => {
    const min = String(Math.floor(secs / 60)).padStart(2, '0');
    const sec = String(secs % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const startSound = () => new Audio('/start.mp3').play();

  const toggleTimer = () => {
    if (isActive) {
      clearInterval(intervalRef.current);
      setIsActive(false);
    } else {
      startSound();
      setIsActive(true);
      intervalRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setTime(0);
    setLaps([]);
    startSound();
  };

  const recordLap = () => {
    if (isActive) {
      setLaps((prev) => {
        const lastTime = prev.length ? parseTime(prev[prev.length - 1].time) : 0;
        const diff = time - lastTime;
        return [...prev, { time: formatTime(time), diff: formatTime(diff) }];
      });
    }
  };

  const parseTime = (str) => {
    const [m, s] = str.split(':').map(Number);
    return m * 60 + s;
  };

  const progress = (time % 60) * 100 / 60;

  return (
    <div className={`stopwatch-container ${darkMode ? 'dark' : ''} animate__animated animate__fadeIn`}>
      <div className="dark-toggle-wrapper">
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider round" />
        </label>
        <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
      </div>

      <h2 className="title mb-4">⏱ Modern Stopwatch</h2>

      <div className="circle-timer mb-3">
        <svg className="progress-ring" width="160" height="160">
          <circle className="bg" r="70" cx="80" cy="80" />
          <circle
            className="progress"
            r="70"
            cx="80"
            cy="80"
            style={{
              strokeDasharray: 440,
              strokeDashoffset: 440 - (440 * progress) / 100,
            }}
          />
        </svg>
        <div className="circle-label">{formatTime(time)}</div>
      </div>

      <div className="btn-group mt-3">
        <button className="btn btn-primary" onClick={toggleTimer}>
          {isActive ? '⏸ Pause' : '▶ Play'}
        </button>
        <button className="btn btn-info" onClick={recordLap} disabled={!isActive}>
          🏁 Lap
        </button>
        <button className="btn btn-danger" onClick={resetTimer}>
          🔄 Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="laps mt-4">
          <h5>Laps:</h5>
          <ul className="list-group">
            {laps.map((lap, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between">
                <div>
                  <strong>Lap {i + 1}</strong>: {lap.time}
                </div>
                <div className="text-muted">+{lap.diff}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
