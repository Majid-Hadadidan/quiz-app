import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";
import Question from "../questions";
export default function Questions({
  index,
  onSelectedAnswer,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

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
  if (answer.selectedAnswer && answer.isCorrect!=null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  }else if(answer.selectedAnswer){
    answerState='answered'
  }
  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
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
