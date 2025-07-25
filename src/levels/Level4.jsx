import React, { useState, useEffect } from 'react';
import { gameContent } from '../data/gameContent';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import backgroundImage from '../assets/background_level1.png';

function Level4({ onComplete }) {
  const levelData = gameContent.level4;
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('');

  const currentPair = levelData.pairs[currentPairIndex];

  const allWords = levelData.pairs.map(pair => pair.rhyme);

  useEffect(() => {
    generateOptions();
  }, [currentPairIndex]);

  const generateOptions = () => {
    const correct = currentPair.rhyme;
    let tempOptions = new Set([correct]);

    while (tempOptions.size < 3) {
      const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
      if (randomWord !== correct) tempOptions.add(randomWord);
    }

    const shuffled = Array.from(tempOptions).sort(() => 0.5 - Math.random());
    setOptions(shuffled);
  };

  const handleOptionClick = (selected) => {
    if (selected === currentPair.rhyme) {
      setFeedback("That’s a rhyme!");
      setTimeout(() => {
        const nextIndex = currentPairIndex + 1;
        if (nextIndex < levelData.pairs.length) {
          setCurrentPairIndex(nextIndex);
          setFeedback('');
        } else {
          onComplete();
        }
      }, 500);
    } else {
      setFeedback("Try again!");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div
              className="p-4 rounded"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                color: 'black',
                borderRadius: '20px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
              }}
            >
              <h3 className="mb-3 text-center">{levelData.title}</h3>
              <p className="text-center">{levelData.story}</p>

              {/* <div className="text-center mb-4">
                <p className="fw-bold">{levelData.character}</p>
              </div> */}

              <div className="text-center mb-3">
                <p className="mb-2 fw-bold">Find a word that rhymes with:</p>
                <h2>{currentPair.word}</h2>
              </div>

              <div className="d-flex justify-content-center gap-2 flex-wrap">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    variant="warning"
                    onClick={() => handleOptionClick(option)}
                    style={{
                      width: '150px',
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {feedback && (
                <Alert
                  variant={feedback === 'That’s a rhyme!' ? 'success' : 'danger'}
                  className="mt-3 text-center"
                >
                  {feedback}
                </Alert>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Level4;