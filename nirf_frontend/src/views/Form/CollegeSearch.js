import React, { useState } from 'react';
import './CollegeSearch.css';

const CollegeSearch = ({ colleges }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const handleSearch = (query) => {
    const regex = new RegExp(query, 'i');
    const filteredColleges = colleges.filter((college) => regex.test(college.name));
    setFilteredColleges(filteredColleges);
  };

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleSelectCollege = (college) => {
    setSearchQuery(college.name);
    setSelectedCollege(college);
    setFilteredColleges([]); // Hide the suggestions
  };

  const handleSuggestionsClick = (event) => {
    const selectedCollegeName = event.target.textContent;
    const selectedCollege = colleges.find((college) => college.name === selectedCollegeName);
    if (selectedCollege) {
      handleSelectCollege(selectedCollege);
    }
  };

  return (
    <div className="CollegeSearch">
      <input
        className="college-input"
        type="text"
        placeholder="Select the College..."
        value={searchQuery}
        onChange={handleChange}
      />
      <ul className="college-ul">
        {filteredColleges.map((college) => (
          <li
            className="college-li"
            key={college.id}
            onClick={() => handleSelectCollege(college)}
          >
            {college.name}
          </li>
        ))}
      </ul>
      {selectedCollege && <p>Selected: {selectedCollege.name}</p>}
    </div>
  );
};

export default CollegeSearch;
