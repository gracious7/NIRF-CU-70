import React, { useState } from "react";
import "./CollegeSearch.css";

const CollegeSearch = ({ colleges }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);

  const handleSearch = (query) => {
    const regex = new RegExp(query, "i"); // 'i' flag for case-insensitive search
    const filteredColleges = colleges.filter((college) =>
      regex.test(college.name)
    );
    setFilteredColleges(filteredColleges);
  };

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div className="CollegeSearch">
      <input
        type="text"
        className="college-input"
        placeholder="Search for colleges"
        value={searchQuery}
        onChange={handleChange}
      />
      <ul className="college-ul">
        {filteredColleges.map((college) => (
          <li className="college-li" key={college.id}>
            {college.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollegeSearch;
