import React, { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css'; // Adjust the path if necessary

export default function ArrayConcepts() {
  const [concepts, setConcepts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Fetch the array topics from the API
    const fetchConcepts = async () => {
      try {
        const response = await fetch('/api/fetchhashing'); // Update with the correct API route
        const data = await response.json();
        setConcepts(data); // Store the fetched data in the state
      } catch (error) {
        console.error('Failed to fetch array concepts:', error);
      }
    };

    fetchConcepts();
  }, []); // Empty dependency array to run only once on mount

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % concepts.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + concepts.length) % concepts.length);
  };

  // Guard against empty concepts array
  if (concepts.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <div className={styles.loadingMessage}>Generating Flashcards...</div>
      </div>
    );
  }

  const currentConcept = concepts[currentIndex];

  return (
    <div className={styles.container}>
      <div className={styles.gradientOverlay}></div>
      <div className={styles.flashcardWrapper}>
        <h1 className={styles.heading}>HASHING</h1>
        <div className={styles.flashcardContainer}>
          <div
            className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
            onClick={handleFlip}
          >
            <div className={styles.cardInner}>
              <div className={styles.front}>
                <div className={styles.frontTitle}>{currentConcept.name}</div>
                <div className={styles.frontDescription}>{currentConcept.description}</div>
              </div>
              <div className={styles.back}>
                <div className={styles.backContent}>
                  <p>Related LeetCode Problems:</p>
                  <ul>
                    {currentConcept.leetcodeProblems.map((problem, index) => (
                      <li key={index}>
                        <a href={problem.url} target="_blank" rel="noopener noreferrer">
                          {problem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.previousButton} onClick={handlePrevious}>Previous Topic</button>
            <button className={styles.nextButton} onClick={handleNext}>Next Topic</button>
          </div>
        </div>
      </div>
    </div>
  );
}
