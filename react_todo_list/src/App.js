import React from 'react';
import './App.css';
import List from './List'

function App() {
  return (
    <main>
      <header>
        <h1>To-Do List</h1>
      </header>
      <div className="content-wrapper">
        <List />
      </div>
    </main>
  );
}

export default App;
