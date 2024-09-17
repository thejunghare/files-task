import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/children");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  const renderItems = (items) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.type === "folder" ? (
              <strong>{item.name}</strong>
            ) : (
              <span>{item.name}</span>
            )}
            {item.children && renderItems(item.children)}{" "}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>Files and Folders</h1>
      {data.length > 0 ? renderItems(data) : <p>Loading...</p>}
    </div>
  );
};

export default Home;
