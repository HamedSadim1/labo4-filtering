import React, { Fragment, FC, useState } from "react";
import Students from "./../Student";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { AiOutlineSortAscending } from "react-icons/ai";
import { BsSortNumericDown } from "react-icons/bs";

const Filtering = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [students, setStudents] = useState(Students);
  const [error, setError] = useState<string>("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortName = () => {
    const sortedStudents = [...filteredStudents].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setStudents(sortedStudents);
  };

  const sortYear = () => {
    const sortedStudents = [...filteredStudents].sort((a, b) =>
      a.year.toString().localeCompare(b.year.toString())
    );
    setStudents(sortedStudents);
  };

  const sortAge = () => {
    const sortedStudents = [...filteredStudents].sort((a, b) =>
      a.age.toString().localeCompare(b.age.toString())
    );
    setStudents(sortedStudents);
  };

  return (
    <Fragment>
      <div style={{ margin: "auto", width: 100 }}>
        <label>Sort by</label>:{" "}
        <input
          type="search"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th onClick={sortName}>
                Name
                <AiOutlineSortAscending />
              </th>
              <th onClick={sortAge}>
                Age <BsSortNumericDown />
              </th>
              <th onClick={sortYear}>
                Year <BsSortNumericDown />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.year}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{ color: "red" }}>
          {filteredStudents.length === 0 && "Student not Found"}
        </div>
      </div>
    </Fragment>
  );
};

export default Filtering;
