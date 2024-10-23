// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KanbanBoard from './components/Kanban/main';
import UserCards from './components/UserCard/UserCards'; 
import TaskBoard from './components/TaskBoard/TaskBoard'; 
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<KanbanBoard />} />
                <Route path="/usercards" element={<UserCards />} />
                <Route path="/taskboard" element={<TaskBoard />} />
            </Routes>
        </Router>
    );
}

export default App;


