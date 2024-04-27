import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";
import Question from "../questions";
export default function Questions({ index, onSelectedAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  //reset timer if we anwer correct or wrong equal to 2000
  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }
  // answer every question
  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: Question[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectedAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect != null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuestionTimer
        timeout={timer}
        key={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{Question[index].text}</h2>
      <Answers
        answers={Question[index].answers}
        answerState={answerState}
        onSelect={handleSelectAnswer}
        selectedAnswer={answer.selectedAnswer}
      />
    </div>
  );
}
