const express = require("express");
const app = express();
const cors = require("cors");
const { response } = require("express");

app.use(cors());
app.use(express.json())

let data = [
  {
    name: "omatsola",
    age: 10,
    id: 1,
  },
  {
    name: "fred",
    age: 25,
    id: 2,
  },
  {
    name: "james",
    age: 13,
    id: 3,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>hello world this is omatsola API</h1>");
});

app.get("/info", (req, res) => {
  res.send(
    "<h1>to access all the files, go to http://localhost:3001/api/data</h1>"
  );
});

app.get("/api/data", (req, res) => {
  res.json(data);
});

app.get("/api/data/:id", (req, res) => {
  const id = Number(req.params.id);
  const d = data.find((d) => d.id === id);

  if (d) {
    res.json(d);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/data/:id', (req, res) => {
  const id = Number(req.params.id)
  const d = data.filter(d => d.id !== id)
  res.status(204).end()
})

const generateId = () => {
  const maxId = data.length > 0
    ? Math.max(...data.map(d => d.id))
    : 0

  return maxId + 1
}

app.post('/api/data', (req, res) => {
  const body = req.body

  const d = {
    name : body.name,
    age : body.age,
    id : generateId()
  }

  data = data.concat(d)
  res.json(d)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
