// Update the JavaScript code in script.js

document
    .getElementById("taskList")
    .addEventListener("htmx:afterRequest", function (event) {
        console.log("🚀 ~ file: index.js:6 ~ event:", event);
        const taskList = document.getElementById("taskList");
        // console.log("🚀 ~ file: index.js:8 ~ taskList:", taskList);
        taskList.innerHTML = ""; // Clear the existing task list

        const tasks = event.detail.xhr.res;
        console.log("🚀 ~ file: index.js:12 ~ tasks:", tasks);
    });
