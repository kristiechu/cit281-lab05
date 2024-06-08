const students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  },
];
function findStudentByID(id) {
  // Will return the first student object from array found with the matching ID
  return students.find((s) => s.id === id);
}
const fastify = require("fastify")();
// Get route and JSON/object reply
fastify.get("/cit", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ test: "This is a test" });
});

fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});
fastify.get("/cit/student/:id", (request, reply) => {
  console.log("ID:", request.params.id);
  const { id = "" } = request.params;
  if (id.length > 0) {
    let student = findStudentByID(parseInt(id));
    if (student !== undefined) {
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(student);
    } else {
      reply
        .code(404)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ error: "Student ID not found" });
    }
  } else {
    reply
      .code(404)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ error: "No student ID provided" });
  }
});
fastify.get("*", (request, reply) => {
  reply
    .code(404)
    .header("Content-Type", "text/html; charset=utf-8")
    .send("<h1>Route not found</h1>");
});

fastify.post("/cit/student", (request, reply) => {
  const { last, first } = request.body;
  const arr = students.map(students => students.id);
  let min = Math.min(...arr);
  let max = Math.max(...arr);
  const newID = max + 1;
  const newStudent = { id: newID, last, first };
  students.push(newStudent);
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(newStudent);
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8082;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
