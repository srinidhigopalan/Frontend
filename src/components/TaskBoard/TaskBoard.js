import todoIcon from '../icons_FEtask/To-do.svg'
import add from '../icons_FEtask/add.svg';
import dot from '../icons_FEtask/menu.svg';
import urgent from '../icons_FEtask/urgent.svg';
import high from '../icons_FEtask/high.svg';
import medium from '../icons_FEtask/medium.svg';
import low from '../icons_FEtask/low.svg';
import nopriority from '../icons_FEtask/nopriority.svg';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { fetchTicketsByPriority } from '../API/api.js';
import './TaskBoard.css'; 

const priorityMap = {
    4: { title: 'Urgent', icon: urgent },
    3: { title: 'High', icon: high },
    2: { title: 'Medium', icon: medium },
    1: { title: 'Low', icon: low },
    0: { title: 'No Priority', icon: nopriority },
};

const priorityOrder = [0, 4, 3, 2, 1];

const TaskBoard = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [tasks, setTasks] = useState({});
    const navigate = useNavigate(); 
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const fetchedTasks = await fetchTicketsByPriority(); 
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        loadTasks(); 
    }, []); 

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleGroupByChange = (event) => {
        if (event.target.value === 'User') {
            navigate('/usercards');
        }
        if (event.target.value === 'Status') {
            navigate('/');
        }
        setDropdownVisible(false);
    };

    const handleOrderByChange = (event) => {
        if (event.target.value === 'Priority') {
            navigate('/taskboard');
        }
        setDropdownVisible(false);
    };

    return (
        <div className="taskboard-container">
            <div className="header">
                <div className="relative">
                    <button className="display-button" onClick={toggleDropdown}>
                        <i className="fas fa-filter"></i> Display
                    </button>
                    {dropdownVisible && (
                        <div className="dropdown">
                            <div className="dropdown-section">
                                <div className="dropdown-label">Grouping</div>
                                <select className="dropdown-select" onChange={handleGroupByChange}>
                                    <option>Select</option>
                                    <option>Status</option>
                                    <option>User</option>
                                </select>
                            </div>
                            <div className="dropdown-section">
                                <div className="dropdown-label">Ordering</div>
                                <select className="dropdown-select" onChange={handleOrderByChange}>
                                    <option>Select</option>
                                    <option>Priority</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="columns">
                {priorityOrder.map((priority) => (
                    <div className="column" key={priority} style={{backgroundColor:"#f7fafc"}}>
                        <div className="column-header">
                            <h2 className="column-title" style={{fontSize:"15px"}}>
                                <img src={priorityMap[priority]?.icon} alt={priorityMap[priority]?.title} className="priority-icon" />
                                {priorityMap[priority]?.title || 'Unknown Priority'} 
                                <span className="task-count" style={{marginLeft:"8px",color: "#a0aec0"}}>{tasks[priority]?.length || 0}</span>
                                <img src={add} alt="add" className="icon-after" /> 
                                <img src={dot} alt="menu" className="icon-after" />
                            </h2>
                        </div>
                        {tasks[priority]?.map(task => (
                            <div className="task" key={task.id} >
                                <div className="task-id">{task.id}</div>
                                <h3 className="task-title" style={{fontSize:"12px"}}>{task.title}</h3>
                                <div className="tags">
                <img src={dot} alt="menu" className="icon-after" />
                    <div className="tag">
                        <div className="icon"><img src={todoIcon} alt="To-do" className="icon-before" /> </div>
                        <span style={{fontSize:"10px", color:"#4a5568",padding:"0.5px"}}>Feature Request </span>
                    </div>
                </div>
                                
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskBoard;
