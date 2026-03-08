// App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    async function fetchLesson() {
      try {
        const response = await fetch('/lessons/lesson_kitchen_orientation_tools.json'); // Replace with dynamic path
        const data = await response.json();
        setLesson(data);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    }

    fetchLesson();
  }, []);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{lesson.title}</h1>
      {lesson.steps.map((step, index) => (
        <div key={index}>
          <h2>Step {index + 1}: {step.instruction}</h2>
          {step.image && <img src={step.image} alt={`Step ${index + 1}`} />}
        </div>
      ))}
    </div>
  );
}

export default App;
