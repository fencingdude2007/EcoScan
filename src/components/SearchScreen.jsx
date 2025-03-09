import React, { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [amazonUrl, setAmazonUrl] = useState("");

  // Function to handle search
  const handleSearch = () => {
    if (!searchTerm) return;

    // Construct the Amazon search URL with the search term
    const searchUrl = `https://www.amazon.com/}`;

    // Update the amazonUrl state to trigger the iframe update
    setAmazonUrl(searchUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search on Amazon"
          className="px-4 py-2 rounded-lg border border-gray-300 w-2/3 mb-4"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white"
        >
          Search
        </button>

        {/* Embed Amazon Search Results */}
        {amazonUrl && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Amazon Search Results</h2>
            <iframe
              src={amazonUrl}
              width="100%"
              height="800px"
              className="border rounded-lg"
              title="Amazon Search Results"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
