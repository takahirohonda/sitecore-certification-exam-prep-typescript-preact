import { h } from 'preact';
import { SC_QUIZ } from '../constants/constantValues';

const Style = () => (
  <style jsx>
    {`@import url('https://fonts.googleapis.com/css?family=Open+Sans|Chilanka&display=swap');

    .${SC_QUIZ}wrapper {
      font-family: 'Open Sans', sans-serif;
      font-size: 14px;
    }

    .${SC_QUIZ}quiz-title{
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .${SC_QUIZ}question-container {
      display: flex;
      margin-top: 10px;
      margin-bottom: 0px;
    }

    .${SC_QUIZ}quiz-counter {
      display: flex;
      justify-content: flex-end;
      margin-right: 15px;
      margin-top: 0px;
      margin-bottom: 0px;
    }

    .${SC_QUIZ}quiz-counter {
      font-weight: bold;
      font-size: 15px;
      font-family: 'Chilanka', cursive;
    }

    .${SC_QUIZ}question-index {
      margin-right: 10px;
    }

    .${SC_QUIZ}choices-container {
      margin: 10px 10px;
    }

    .${SC_QUIZ}choices-title {
      margin-bottom: 15px;
    }

    .${SC_QUIZ}choices-radio-container {
      display: flex;
      flex-direction: column;
    }

    .${SC_QUIZ}radio-input {
      display: none;
    }

    .${SC_QUIZ}radio-square-button {
      width: 25px;
      height: 25px;
      border: 1px solid #B1B1B1;
      margin-right: 15px;
      position: relative;
    }

    .${SC_QUIZ}radio-label {
      display: flex;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .${SC_QUIZ}radio-input:checked + .${SC_QUIZ}radio-label > .${SC_QUIZ}radio-square-button {
      border-width: 0px;
      transition: all .2s ease-out;
    }

    .${SC_QUIZ}radio-square-button:after {
      position: absolute;
      content: "\\2713";
      font-size: 35px;
      top: -19px;
      left: 2px;
      color: #00D571;
      opacity: 0;

    }

    .${SC_QUIZ}radio-input:checked + .${SC_QUIZ}radio-label > .${SC_QUIZ}radio-square-button:after {
      opacity: 1;
      transition: all .25s ease-in;
    }

    .${SC_QUIZ}btn-container {
      margin: 30px 10px;
      display: flex;
      justify-content: space-between;
    }

    @media only screen and (max-width: 1000px) {
      .${SC_QUIZ}btn-container {
        margin: 30px 10px;
        display: flex;
        flex-direction: column;
      }
      .${SC_QUIZ}btn-container-right {
        margin-top: 30px;
      }
    }

    .${SC_QUIZ}btn-control {
      margin-left: 10px;
      margin-top: 10px;
    }

    .${SC_QUIZ}btn-direction {
      background-color: #19a5a2;
      color: white;
      border: 1px solid #19a5a2;
      width: 120px;
      height: 40px;
    }

    .${SC_QUIZ}btn-direction:active,
    .${SC_QUIZ}btn-direction:hover {
      background-color: white;
      color: #19a5a2;
      border: 1px solid #19a5a2;
      width: 120px;
      height: 40px;
      outline: none;
    }

    .${SC_QUIZ}btn-direction:focus {
      outline: none;
    }

    .${SC_QUIZ}btn-confirm {
      background-color: #ED3B58;
      color: white;
      border: 1px solid #ED3B58;
      width: 120px;
      height: 40px;
    }

    .${SC_QUIZ}btn-confirm:active,
    .${SC_QUIZ}btn-confirm:hover {
      background-color: white;
      color: #ED3B58;;
      border: 1px solid #ED3B58;
      width: 120px;
      height: 40px;
      outline: none;
    }

    .${SC_QUIZ}btn-confirm:focus {
      outline: none;
    }

    .${SC_QUIZ}btn-clear {
      background-color: #866768;
      color: white;
      border: 1px solid #866768;
      width: 120px;
      height: 40px;
    }

    .${SC_QUIZ}btn-clear:active,
    .${SC_QUIZ}btn-clear:hover {
      background-color: white;
      color:  #866768;
      border: 1px solid #866768;
      width: 120px;
      height: 40px;
      outline: none;
    }

    .${SC_QUIZ}btn-clear:focus {
      outline: none;
    }

    .${SC_QUIZ}btn-control.disabled {
      background-color: #9fa5aa;
      color: white;
      border: 1px solid #9fa5aa;
    }

    .${SC_QUIZ}correct-answer {
      border: 0px solid #0075b4;
      animation: ${SC_QUIZ}fadeInAnswerBorders 0.3s linear;
      animation-fill-mode: forwards;
      animation-delay: 0.2s;
    }

    .${SC_QUIZ}wrong-answer {
      border: 0px solid #b20610;
      animation: ${SC_QUIZ}fadeInAnswerBorders 0.3s linear;
      animation-fill-mode: forwards;
      animation-delay: 0.2s;
    }

    .${SC_QUIZ}wrong-answer > .${SC_QUIZ}radio-square-button {
      border-width: 0px;
    }

    .${SC_QUIZ}correct-answer > .${SC_QUIZ}radio-square-button {
      border-width: 0px;
    }

    .${SC_QUIZ}correct-msg {
      position: relative;
      color: #0075b4;
      font-weight: bold;
      animation: ${SC_QUIZ}fadeInMessages 0.3s cubic-bezier(.65,.12,.9,.6);
    }

    .${SC_QUIZ}correct-msg:after {
      content: '\\2713';
      position: absolute;
      font-size: 18px;
      left: 68px;
      animation: ${SC_QUIZ}fadeInMessages 0.3s cubic-bezier(.65,.12,.9,.6);
    }

    .${SC_QUIZ}incorrect-msg {
      position: relative;
      font-weight: bold;
      color: #b20610;
      animation: ${SC_QUIZ}fadeInMessages 0.3s cubic-bezier(.65,.12,.9,.6);
    }

    .${SC_QUIZ}incorrect-msg:after {
      content: '\\2718';
      position: absolute;
      font-size: 18px;
      left: 83px;
      animation: ${SC_QUIZ}fadeInMessages 0.3s cubic-bezier(.65,.12,.9,.6);
    }

    .${SC_QUIZ}feedback-message {
      font-size: 14px;
      font-style: italic;
      animation: ${SC_QUIZ}growRight 0.25s cubic-bezier(.65,.12,.9,.6);
      transform-origin: left;
    }

    /* quiz form animation */

    .${SC_QUIZ}quiz-form {
      animation: ${SC_QUIZ}growRight 0.25s cubic-bezier(.65,.12,.9,.6);
      transform-origin: left;
    }

    @keyframes ${SC_QUIZ}growRight {
      from {
        opacity: 0;
        transform: scaleX(0);
      }
      to {
        opacity: 1;
        transform: scaleX(1);
      }
    }

    @keyframes ${SC_QUIZ}fadeInMessages {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    @keyframes ${SC_QUIZ}fadeInAnswerBorders {
      from {
        border-width: 1px;
      }

      to {
        border-width: 1px;
      }
    }

    `}
  </style>
);

export default Style;