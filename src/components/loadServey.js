// Retrieve survey data from JSON file
fetch("data/surveyData.json")
    .then((response) => response.json())
    .then((data) => {
        // survey data 접근
        const surveyTitle = data.surveyTitle;
        const surveyDescription = data.surveyDescription;
        const questions = JSON.parse(data.questions);

        // survey data를 웹에 뿌리기
        document.getElementById("survey-title").textContent = surveyTitle;
        document.getElementById("survey-description").textContent =
            surveyDescription;

        // question들 반복
        questions.forEach((question) => {
            const questionTitle = question.questionTitle;
            const questionType = question.questionType;
            const items = question.item;

            // question, title, item
            const questionDiv = document.createElement("div");
            const questionTitleH3 = document.createElement("h3");
            const questionItemsDiv = document.createElement("div");

            // question title
            questionTitleH3.textContent = questionTitle;

            // question div에 item 넣기
            items.forEach((item) => {
                const itemLabel = document.createElement("label");
                const itemInput = document.createElement("input");

                if (questionType === 1) {
                    // Radio button
                    itemInput.setAttribute("type", "radio");
                    itemInput.setAttribute("name", questionTitle);
                    itemInput.setAttribute("value", item);
                } else if (questionType === 2) {
                    // Checkbox
                    itemInput.setAttribute("type", "checkbox");
                    itemInput.setAttribute("name", questionTitle);
                    itemInput.setAttribute("value", item);
                } else if (questionType === 3) {
                    // Text input
                    itemInput.setAttribute("type", "text");
                    itemInput.setAttribute("name", questionTitle);
                    itemInput.setAttribute("placeholder", item);
                }

                itemLabel.appendChild(itemInput);
                itemLabel.appendChild(document.createTextNode(item));
                questionItemsDiv.appendChild(itemLabel);
            });

            // question div에 question title이랑 item 넣기
            questionDiv.appendChild(questionTitleH3);
            questionDiv.appendChild(questionItemsDiv);

            // survey form에 question div 넣기
            document.getElementById("survey-form").appendChild(questionDiv);
        });

        // event listener 넣어서 submit 되었는지 확인
        const surveyForm = document.getElementById("survey-form");
        surveyForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(surveyForm);

            for (const entry of formData.entries()) {
                console.log(entry);
            }
        });
    });
