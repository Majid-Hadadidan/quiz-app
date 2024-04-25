import { useState, useCallback } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  //in this case, the game is over
  const questionIsCompleted = userAnswers.length === Question.length;

  // select every answer in Question
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  },
  []);

  if (questionIsCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }
  //shuffle every  answers in question
  const shuffleAnswers = [...Question[activeQuestionIndex].answers];
  shuffleAnswers.sort(() => Math.random() - 0.5);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  return (
    <div id="quiz">
      <QuestionTimer
        key={activeQuestionIndex}
        timeout={10000}
        onTimeout={handleSkipAnswer}
      />
      <div id="question">
        <h2>{Question[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffleAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
