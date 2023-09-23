const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Add this line

const app = express();
const port = 3001;
app.use(cors({ origin: "*" })); // Allow requests from http://localhost:3000

app.use(bodyParser.json());

let tasks = [
    {
        id: 1,
        text: "HTMX DEMO",
    },
    {
        id: 2,
        text: "HTMX Basics",
    },
    {
        id: 3,
        text: "HTMX Advanced",
    },
];

app.post("/add-task", (req, res) => {
    const taskText = req.body.taskText;

    if (taskText) {
        const newTask = {
            id: tasks.length + 1,
            text: taskText,
        };

        tasks.push(newTask);
        // res.json({ success: true, task: newTask });

        // Generate updated HTML for the task list
        const taskListHTML = tasks
            .map((task) => generateTaskHTML(task))
            .join("");
        const htmlResponse = `<ul id="taskList">${taskListHTML}</ul>`;

        res.send(htmlResponse);
    } else {
        res.status(400).send("Task text is required.");
    }
});

app.delete("/remove-task/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
        tasks.splice(index, 1);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, error: "Task not found." });
    }
});

function generateTaskHTML(task) {
    return `
      <li>
        <span class="task-text">${task.text}</span>
        <button class="delete-button" hx-delete="http://localhost:3001/remove-task/${task.id}">Remove</button>
      </li>`;
}

app.get("/tasks", (req, res) => {
    const taskListHTML = generateTaskHTML(tasks);
    const htmlResponse = `<ul id="taskList">${taskListHTML}</ul>`;
    res.send(htmlResponse);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
