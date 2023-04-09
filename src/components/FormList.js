import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormStateContext } from "../App";

export const FormList = () => {
  const navigation = useNavigate();
  const formData = useContext(FormStateContext);

  const handleFormClick = (id) => {
    fetch("./data/surveyData.json")
      .then((response) => response.json())
      .then((data) => {
        const surveyTitle = data.surveyTitle;
        const surveyDescription = data.surveyDescription;
        const questions = JSON.parse(data.questions);

        const surveyFormHtml = `
          <h1 id="survey-title">${surveyTitle}</h1>
          <p id="survey-description">${surveyDescription}</p>
          <form id="survey-form">
            ${questions
              .map(
                (question) => `
                  <div>
                    <h3>${question.questionTitle}</h3>
                    ${question.item
                      .map(
                        (item) => `
                          <label>
                            ${
                              question.questionType === 1
                                ? `<input type="radio" name="${question.questionTitle}" value="${item}"/>`
                                : question.questionType === 2
                                ? `<input type="checkbox" name="${question.questionTitle}" value="${item}"/>`
                                : `<input type="text" name="${question.questionTitle}" placeholder="${item}"/>`
                            }
                            ${item}
                          </label>
                        `
                      )
                      .join("")}
                  </div>
                `
              )
              .join("")}
            <button type="submit">Submit</button>
          </form>
        `;

        const newWindow = window.open("", "_blank");
        newWindow.document.write(surveyFormHtml);
        newWindow.document.close();

        // event listener 넣어서 submit 되었는지 확인
        const surveyForm = newWindow.document.getElementById("survey-form");
        surveyForm.addEventListener("submit", (event) => {
          event.preventDefault();

          const formData = new FormData(surveyForm);

          for (const entry of formData.entries()) {
            console.log(entry);
          }
        });
      });
  };

  return (
    <div className="formList">
      {formData.map((it) => (
        <div key={it.id} className="formListElem">
          <button onClick={() => handleFormClick(it.id)}>Title : {it.formTitle}</button>
        </div>
      ))}
    </div>
  );
};
