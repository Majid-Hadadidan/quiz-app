import { useState, useCallback, useRef } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
export default function Quiz() {
  const shuffleAnswers = useRef();
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  //in this case, the game is over
  const questionIsCompleted = userAnswers.length === Question.length;

  // select every answer in Question
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswer) => {
        return [...prevUserAnswer, selectedAnswer];
      });
      setTimeout(() => {
        if (selectedAnswer === Question[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  if (questionIsCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />

        <h2>{Question[activeQuestionIndex].text}</h2>
        <Answers
          key={activeQuestionIndex}
          answers={Question[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelect={handleSelectAnswer}
        />
      </div>
    </div>
  );
}
