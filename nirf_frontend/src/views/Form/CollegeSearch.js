import React, { useState, useRef, useEffect } from "react";
import collegesData from "../../assets/data/colleges.json"; // Import your college data
import "./CollegeSearch.css";
import { useColorMode } from "@chakra-ui/system";

const CollegeSearch = ({ setClgName }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const theme = useColorMode();

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    const regex = new RegExp(text, "i");
    const filteredColleges = collegesData.filter((college) =>
      regex.test(college.name)
    );

    // Show only the first 5 suggestions
    const limitedSuggestions = filteredColleges.slice(0, 5);
    setSuggestions(limitedSuggestions);
  };

  const handleSuggestionClick = (college) => {
    setSearchText(college.name);
    setClgName(college.name);
    setSuggestions([]);
  };

  const handleClickOutside = (event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) &&
      inputRef.current !== event.target
    ) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container CollegeSearch" ref={containerRef}>
      <input
        className="college-input"
        type="text"
        placeholder="Search for a college"
        value={searchText}
        onChange={handleInputChange}
        ref={inputRef}
        style={{backgroundColor: theme.colorMode === 'light' ? 'white' : '#0f183c'}}
      />
      {suggestions.length > 0 && (
        <div className="suggestions" style={{backgroundColor: theme.colorMode === 'light' ? 'white' : '#0f183c'}}>
          {suggestions.map((college) => (
            <div
              key={college.id}
              className="suggestion"
              onClick={() => handleSuggestionClick(college)}
            >
              {college.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollegeSearch;
