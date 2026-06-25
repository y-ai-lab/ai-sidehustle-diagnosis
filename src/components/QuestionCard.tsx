import type { Question } from '../types';

type Props = {
  question: Question;
  questionNumber: number;
  total: number;
  selectedIndex?: number;
  onSelect: (index: number) => void;
  onBack: () => void;
  canBack: boolean;
};

export function QuestionCard({ question, questionNumber, total, selectedIndex, onSelect, onBack, canBack }: Props) {
  return (
    <section className="questionCard">
      <p className="questionCount">Q{questionNumber} / {total}</p>
      <h2>{question.title}</h2>
      {question.subtitle && <p className="muted">{question.subtitle}</p>}
      <div className="optionList">
        {question.options.map((option, index) => (
          <button
            key={option.label}
            className={`optionButton ${selectedIndex === index ? 'selected' : ''}`}
            onClick={() => onSelect(index)}
          >
            <span>{option.label}</span>
            {option.description && <small>{option.description}</small>}
          </button>
        ))}
      </div>
      <button className="ghostButton" disabled={!canBack} onClick={onBack}>戻る</button>
    </section>
  );
}
