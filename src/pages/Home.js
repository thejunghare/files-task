import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data); // Accessing data from the Redux store

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/children');
        const result = await response.json();
        dispatch({ type: 'SET_DATA', payload: result }); // Dispatch action to update Redux store
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const renderItems = (items) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.type === 'folder' ? (
              <strong>{item.name}</strong>
            ) : (
              <span>{item.name}</span>
            )}
            {item.children && renderItems(item.children)}{' '}
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
