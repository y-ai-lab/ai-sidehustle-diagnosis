import { useMemo, useState } from 'react';
import { HomePage } from './components/HomePage';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { ResultPage } from './components/ResultPage';
import { questions } from './data/questions';
import { results } from './data/results';
import { calculateScores, pickResultType } from './utils/calculateResult';
import './styles.css';

type Stage = 'home' | 'question' | 'result';

export default function App() {
  const [stage, setStage] = useState<Stage>('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const scores = useMemo(() => calculateScores(questions, answers), [answers]);
  const resultType = pickResultType(scores);
  const result = results[resultType];

  const handleStart = () => {
    setAnswers([]);
    setCurrentIndex(0);
    setStage('question');
  };

  const handleSelect = (optionIndex: number) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = optionIndex;
    setAnswers(nextAnswers);

    if (currentIndex >= questions.length - 1) {
      setStage('result');
      return;
    }
    setCurrentIndex((current) => current + 1);
  };

  const handleBack = () => {
    setCurrentIndex((current) => Math.max(0, current - 1));
  };

  return (
    <div className="appShell">
      {stage === 'home' && <HomePage onStart={handleStart} />}

      {stage === 'question' && (
        <main className="quizPage">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
          <QuestionCard
            question={questions[currentIndex]}
            questionNumber={currentIndex + 1}
            total={questions.length}
            selectedIndex={answers[currentIndex]}
            onSelect={handleSelect}
            onBack={handleBack}
            canBack={currentIndex > 0}
          />
        </main>
      )}

      {stage === 'result' && <ResultPage result={result} scores={scores} onRestart={handleStart} />}
    </div>
  );
}
