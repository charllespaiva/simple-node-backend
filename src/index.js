const express = require("express");
const { uuid } = require("uuidv4");

const app = express();
app.use(express.json());

const projects = [];

app.get("/projects", (req, res) => {
  const { title } = req.query;

  const result = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  res.json(result);
});

app.post("/projects", (req, res) => {
  const { title, owner } = req.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  res.json(project);
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: "Project Not found" });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  res.status(200).json(project);
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: "Project Not found" });
  }

  projects.splice(projectIndex, 1);

  res.status(204).send();
});

app.listen(3333, () => console.log("🚀 Backend started!"));
