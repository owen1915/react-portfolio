"use client";

import { useState, useEffect, useRef } from "react";
import TestSelector from "./TestSelector";

export default function TypingRaceGame() {
  // Test configuration
  const [testData, setTestData] = useState({});
  const [selectedDuration, setSelectedDuration] = useState("30s");
  const [words, setWords] = useState([]);

  // Game state
  const [gameState, setGameState] = useState("idle"); // idle | ready | playing | finished
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [wordHasError, setWordHasError] = useState(false);

  // Progress tracking
  const [userProgress, setUserProgress] = useState(0);
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [opponentWordIndex, setOpponentWordIndex] = useState(0);
  const [opponentCharIndex, setOpponentCharIndex] = useState(0);

  // Timing
  const [startTime, setStartTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Statistics
  const [correctWords, setCorrectWords] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wordErrors, setWordErrors] = useState([]); // Track which words had errors

  // Configuration
  const OPPONENT_WPM = 130;

  // Refs
  const gameTimerRef = useRef(null);
  const opponentTimerRef = useRef(null);
  const inputRef = useRef(null);
  const passageRef = useRef(null);
  const currentWordRef = useRef(null);

  // Load test data
  useEffect(() => {
    fetch("/typing-tests.json")
      .then((res) => res.json())
      .then((data) => setTestData(data))
      .catch((err) => console.error("Failed to load tests:", err));
  }, []);

  // Auto-scroll to keep current word visible
  useEffect(() => {
    if (gameState === "playing" && currentWordRef.current && passageRef.current) {
      const wordElement = currentWordRef.current;
      const passageElement = passageRef.current;

      const wordRect = wordElement.getBoundingClientRect();
      const passageRect = passageElement.getBoundingClientRect();

      // If word is below visible area, scroll down
      if (wordRect.bottom > passageRect.bottom - 40) {
        passageElement.scrollTop += wordRect.bottom - passageRect.bottom + 40;
      }
      // If word is above visible area, scroll up
      if (wordRect.top < passageRect.top + 40) {
        passageElement.scrollTop -= passageRect.top - wordRect.top + 40;
      }
    }
  }, [currentWordIndex, gameState]);

  // Get test duration in seconds
  const getTestDuration = () => {
    return parseInt(selectedDuration);
  };

  // Shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Prepare game (ready state)
  const prepareGame = () => {
    if (!testData[selectedDuration]) return;

    // Shuffle words
    const shuffledWords = shuffleArray(testData[selectedDuration]);
    setWords(shuffledWords);

    setGameState("ready");
    setCurrentWordIndex(0);
    setUserInput("");
    setWordHasError(false);
    setUserProgress(0);
    setOpponentProgress(0);
    setOpponentWordIndex(0);
    setOpponentCharIndex(0);
    setCorrectWords(0);
    setTotalWords(0);
    setWpm(0);
    setAccuracy(100);
    setWordErrors([]);
    setTimeRemaining(getTestDuration());

    // Focus input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  // Start game (called on first keypress)
  const startGame = () => {
    setGameState("playing");
    setStartTime(Date.now());

    // Start game timer
    const duration = getTestDuration();
    gameTimerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Owen types at exactly 130 WPM - word by word
    // 130 words per minute = 130/60 = 2.167 words per second
    // Each word takes 60000ms / 130 = 461ms
    const msPerWord = 60000 / OPPONENT_WPM;

    opponentTimerRef.current = setInterval(() => {
      setOpponentWordIndex((prevIdx) => {
        const nextIdx = prevIdx + 1;

        // Update progress
        const progressPercent = (nextIdx / words.length) * 100;
        setOpponentProgress(Math.min(100, progressPercent));

        // Check if finished
        if (nextIdx >= words.length) {
          clearInterval(opponentTimerRef.current);
          setOpponentProgress(100);
          return words.length - 1;
        }

        return nextIdx;
      });
    }, msPerWord);
  };

  // End game
  const endGame = () => {
    setGameState("finished");
    clearInterval(gameTimerRef.current);
    clearInterval(opponentTimerRef.current);
  };

  // Reset game
  const resetGame = () => {
    setGameState("idle");
    setCurrentWordIndex(0);
    setUserInput("");
    setWordHasError(false);
    setUserProgress(0);
    setOpponentProgress(0);
    setOpponentWordIndex(0);
    setOpponentCharIndex(0);
    setCorrectWords(0);
    setTotalWords(0);
    setWpm(0);
    setAccuracy(100);
    setWordErrors([]);
    setStartTime(null);
    setTimeRemaining(null);
    clearInterval(gameTimerRef.current);
    clearInterval(opponentTimerRef.current);
  };

  // Calculate WPM
  const calculateWPM = (correct, elapsed) => {
    if (elapsed === 0) return 0;
    const minutes = elapsed / 60;
    return Math.round(correct / minutes);
  };

  // Handle input change
  const handleInputChange = (e) => {
    if (gameState !== "playing" && gameState !== "ready") return;

    // Start game on first keypress
    if (gameState === "ready") {
      startGame();
    }

    const input = e.target.value;
    setUserInput(input);

    // Check if current input matches the beginning of the word
    const currentWord = words[currentWordIndex];
    if (!currentWord) return;

    const isCorrectSoFar = currentWord.startsWith(input);
    setWordHasError(!isCorrectSoFar && input.length > 0);
  };

  // Handle word submission
  const handleWordSubmit = (e) => {
    if (e.key !== " " && e.key !== "Enter") return;
    if (gameState !== "playing") return;

    e.preventDefault();

    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const currentWord = words[currentWordIndex];
    const isCorrect = trimmedInput === currentWord && !wordHasError;

    // Track if this word had errors
    if (!isCorrect) {
      setWordErrors((prev) => [...prev, currentWordIndex]);
    }

    if (isCorrect) {
      setCorrectWords((prev) => prev + 1);
    }
    setTotalWords((prev) => prev + 1);

    // Update accuracy
    const newCorrect = isCorrect ? correctWords + 1 : correctWords;
    const newTotal = totalWords + 1;
    setAccuracy(newTotal > 0 ? Math.round((newCorrect / newTotal) * 100) : 100);

    // Calculate WPM based only on correct words
    const elapsed = (Date.now() - startTime) / 1000;
    setWpm(calculateWPM(newCorrect, elapsed));

    // Move to next word
    const nextWordIndex = currentWordIndex < words.length - 1 ? currentWordIndex + 1 : currentWordIndex;
    setCurrentWordIndex(nextWordIndex);

    // Update progress based on current word position
    setUserProgress(((nextWordIndex) / words.length) * 100);

    setUserInput("");
    setWordHasError(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(gameTimerRef.current);
      clearInterval(opponentTimerRef.current);
    };
  }, []);

  // Render loading state
  if (Object.keys(testData).length === 0) {
    return <div className="loading">Loading tests...</div>;
  }

  // Render idle state (test selection)
  if (gameState === "idle") {
    return (
      <div className="typing-race-game">
        <TestSelector
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
        />
        <button className="link start-btn" onClick={prepareGame}>
          Start Race
        </button>
      </div>
    );
  }

  // Render ready and playing state
  if (gameState === "ready" || gameState === "playing") {
    const currentWord = words[currentWordIndex];

    return (
      <div className="typing-race-game">
        <div className="game-header">
          <div className="time-display">
            <span className="time-value">{timeRemaining}</span>
            {gameState === "ready" && <span className="ready-hint">Start typing to begin</span>}
          </div>
          <div className="game-stats-inline">
            <div className="stat-inline">
              <span className="stat-label">WPM</span>
              <span className="stat-value">{wpm}</span>
            </div>
            <div className="stat-inline">
              <span className="stat-label">Accuracy</span>
              <span className="stat-value">{accuracy}%</span>
            </div>
          </div>
        </div>

        <div className="text-passage" ref={passageRef}>
          {words.map((word, wordIdx) => {
            let className = "passage-word";

            // User's current word with character highlighting
            if (wordIdx === currentWordIndex) {
              return (
                <span
                  key={wordIdx}
                  className={`${className} current-word`}
                  ref={currentWordRef}
                >
                  {word.split("").map((char, charIdx) => {
                    let charClass = "char user-char";
                    if (charIdx < userInput.length) {
                      if (userInput[charIdx] === char) {
                        charClass += " correct";
                      } else {
                        charClass += " incorrect";
                      }
                    } else if (charIdx === userInput.length) {
                      charClass += " cursor";
                    }
                    return (
                      <span key={charIdx} className={charClass}>
                        {char}
                      </span>
                    );
                  })}
                  {" "}
                </span>
              );
            }

            // Owen's current word - simple orange highlight
            if (wordIdx === opponentWordIndex) {
              className += " opponent-word";
            }

            // Completed words
            if (wordIdx < currentWordIndex) {
              // Check if this word had errors
              const hasError = wordErrors.includes(wordIdx);
              if (hasError) {
                className += " error-word";
              } else {
                className += " completed";
              }
            }

            return (
              <span key={wordIdx} className={className}>
                {word}{" "}
              </span>
            );
          })}
        </div>

        <input
          ref={inputRef}
          type="text"
          className={`typing-input ${wordHasError ? "error" : ""}`}
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleWordSubmit}
          placeholder="Type here..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    );
  }

  // Render finished state
  if (gameState === "finished") {
    // Winner is always determined by WPM
    const userWon = wpm > OPPONENT_WPM;

    return (
      <div className="typing-race-game">
        <div className="results">
          <h3 className={`results-title ${userWon ? "user-won" : "opponent-won"}`}>
            {userWon ? "You Won!" : "Owen Won!"}
          </h3>

          <div className="results-stats">
            <div className="result-item">
              <span className="result-label">Your WPM</span>
              <span className="result-value">{wpm}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Owen's WPM</span>
              <span className="result-value">{OPPONENT_WPM}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Accuracy</span>
              <span className="result-value">{accuracy}%</span>
            </div>
            <div className="result-item">
              <span className="result-label">Words Typed</span>
              <span className="result-value">
                {correctWords}/{totalWords}
              </span>
            </div>
          </div>

          <div className="results-actions">
            <button className="link" onClick={prepareGame}>
              Try Again
            </button>
            <button className="link" onClick={resetGame}>
              Change Duration
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
