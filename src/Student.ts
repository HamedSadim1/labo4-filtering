import { Student } from "./types/Student";
import { generate } from "shortid";

const Students: Student[] = [
  {
    id: generate(),
    name: "Jacob",
    age: 20,
    year: 1,
  },
  {
    id: generate(),
    name: "Mia",
    age: 21,
    year: 2,
  },
  {
    id: generate(),
    name: "Noah",
    age: 22,
    year: 1,
  },
  {
    id: generate(),
    name: "Emma",
    age: 23,
    year: 4,
  },
  {
    id: generate(),
    name: "Olivia",
    age: 24,
    year: 3,
  },
  {
    id: generate(),
    name: "William",
    age: 25,
    year: 4,
  },
  {
    id: generate(),
    name: "Ava",
    age: 20,
    year: 2,
  },
  {
    id: generate(),
    name: "James",
    age: 25,
    year: 1,
  },
  {
    id: generate(),
    name: "Isabella",
    age: 23,
    year: 3,
  },
];

export default Students;
