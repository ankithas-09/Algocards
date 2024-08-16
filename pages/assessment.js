import { useState, useEffect } from 'react';
import ButtonAnswer from '../components/ButtonAnswer';
import { shuffleArray } from '../lib/util';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Store selected answers

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('/api/questions');
        const data = await response.json();
        setQuestions(data.map(q => ({
          ...q,
          answers: shuffleArray([q.answer, ...q.wrongAnswers])
        })));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    fetchQuestions();
  }, []);

  const totalQuestions = questions.length;
  const question = questions[questionIndex] || {};

  function startOver() {
    setGameStatus('playing');
    setScore(0);
    setQuestionIndex(0);
    setLoading(true);
    setSelectedAnswers([]);
  }

  function handleAnswerClick(answer) {
    setSelectedAnswers(prev => [...prev, { question: question.question, selected: answer, correct: question.answer }]);

    if (answer === question.answer) {
      setScore(prev => prev + 1);
    }

    if (questionIndex + 1 === questions.length) {
      setGameStatus('finished');
    } else {
      setQuestionIndex(prev => prev + 1);
    }
  }

  return (
    <main className={styles.assessmentContent}>
      <div className={styles.gradientOverlay}></div> {/* Gradient overlay covering entire viewport */}
      {loading ? (
        <div className={styles.loadingSection}>
          <h2>Preparing your Assessment...</h2>
        </div>
      ) : (
        <>
          {gameStatus === 'finished' && (
            <div className={styles.resultsSection}>
              <h2 className={styles.resultTitle}>Here's how you did!</h2>
              <p className={styles.scoreDisplay}>
                Your score was {score} / {totalQuestions}
              </p>
              <ul className={styles.correctAnswersList}>
                {selectedAnswers.map((item, index) => (
                  <li key={index} className={styles.correctAnswerItem}>
                    <strong>Q:</strong> {item.question}<br />
                    <strong>Your answer:</strong> {item.selected}<br />
                    <strong>Correct answer:</strong> {item.correct}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {gameStatus === 'playing' && (
            <div className={styles.questionSection}>
              <h2 className={styles.questionTitle}>Q: {question.question}</h2>
              <ul className={styles.answersList}>
                {question.answers && question.answers.map(answer => (
                  <li key={answer} className={styles.answerItem}>
                    <ButtonAnswer className={styles.buttonAnswer} onClick={() => handleAnswerClick(answer)}>
                      {answer}
                    </ButtonAnswer>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </main>
  );
}
