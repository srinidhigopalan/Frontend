import backlogIcon from '../icons_FEtask/Backlog.svg'
import cancelledIcon from '../icons_FEtask/Cancelled.svg'
import doneIcon from '../icons_FEtask/Done.svg'
import inprogIcon from '../icons_FEtask/in-progress.svg'
import todoIcon from '../icons_FEtask/To-do.svg'
import add from '../icons_FEtask/add.svg'
import dot from '../icons_FEtask/menu.svg'
import display from '../icons_FEtask/Display.svg'

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTicketsByStatus, fetchTicketsByPriority } from '../API/api'; 
import './kanban.css';

function KanbanBoard() {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [tickets, setTickets] = useState({}); 
    const key="In progress";
    const newKey="InProgress"
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataByStatus = await fetchTicketsByStatus();
                const dataByPriority = await fetchTicketsByPriority();
                setTickets({ dataByStatus, dataByPriority });
                
                if (dataByStatus[key]) {
                    dataByStatus[newKey] = dataByStatus[key];
                    delete dataByStatus[key];
                }
                
            } catch (error) {
                console.error('Error fetching ticket data:', error);
            }
        };
        fetchData();
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleGroupByChange = (event) => {
        if (event.target.value === "User") {
            navigate('/usercards');
        }
        if (event.target.value === "Status") {
            navigate('/');
        }
        setDropdownVisible(false);
    };

    const handleOrderByChange = (event) => {
        if (event.target.value === "Priority") {
            navigate('/taskboard');
        }
        setDropdownVisible(false);
    };

    return (
        <div className="kanban-board">
            <div className="controls">
                <div className="relative">
                    <button className="display-button" onClick={toggleDropdown}>
                    <img src={display} alt="Display" className="icon" /> Display
                    </button>
                    {dropdownVisible && (
                        <div className="dropdown">
                            <div className="dropdown-section">
                                <div className="dropdown-label">Grouping</div>
                                <select className="dropdown-select" onChange={handleGroupByChange}>
                                    <option value="">Select</option>
                                    <option value="Status">Status</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <div className="dropdown-section">
                                <div className="dropdown-label">Ordering</div>
                                <select className="dropdown-select" onChange={handleOrderByChange}>
                                    <option value="">Select</option>
                                    <option value="Priority">Priority</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="columns">
    <Column 
        title={
            <>
                <img src={backlogIcon} alt="Backlog" className="icon-before" /> 
                Backlog <span className="count" > {tickets.dataByStatus?.Backlog?.length || 0}</span>
                <img src={add} alt="add" className="icon-after" /> 
                <img src={dot} alt="menu" className="icon-after" />
            </>
        } 
        >
        {tickets.dataByStatus?.Backlog?.map(ticket => (
            <Task key={ticket.id} id={ticket.id} title={ticket.title} />
        ))}
    </Column>

    <Column 
        title={
            <>
                <img src={todoIcon} alt="Todo" className="icon-before" /> 
                Todo <span className="count"> {tickets.dataByStatus?.Todo?.length || 0}</span>
                <img src={add} alt="add" className="icon-after" /> 
                <img src={dot} alt="menu" className="icon-after" />
            </>
        } 
        >
        {tickets.dataByStatus?.Todo?.map(ticket => (
            <Task key={ticket.id} id={ticket.id} title={ticket.title} />
        ))}
    </Column>

    <Column 
        title={
            <>
                <img src={inprogIcon} alt="InProgress" className="icon-before" /> 
                In Progress <span className="count"> {tickets.dataByStatus?.InProgress?.length || 0}</span>
                <img src={add} alt="add" className="icon-after" /> 
                <img src={dot} alt="menu" className="icon-after" />
            </>
        } 
        >
        {tickets.dataByStatus?.InProgress?.map(ticket => (
            <Task key={ticket.id} id={ticket.id} title={ticket.title} />
        ))}
    </Column>

    <Column 
        title={
            <>
                <img src={doneIcon} alt="Done" className="icon-before" /> 
                Done <span className="count"> {tickets.dataByStatus?.Done?.length || 0}</span>
                <img src={add} alt="add" className="icon-after" /> 
                <img src={dot} alt="menu" className="icon-after" />
            </>
        } 
        >
        {tickets.dataByStatus?.Done?.map(ticket => (
            <Task key={ticket.id} id={ticket.id} title={ticket.title} />
        ))}
    </Column>

    <Column 
        title={
            <>
                <img src={cancelledIcon} alt="Cancelled" className="icon-before" /> 
                Cancelled <span className="count"> {tickets.dataByStatus?.Cancelled?.length || 0}</span>
                <img src={add} alt="add" className="icon-after" />
            </>
        } 
        />
</div>
</div>
           
    );
}

function Column({ title, count, children }) {
    return (
        <div className="column" style={{backgroundColor:"#f7fafc"}}>
            <div className="column-header" style={{fontSize:"14px"}}>
                <h2>{title}</h2>
            </div>
            <div className="task-list">
                {children}
            </div>
        </div>
    );
}

function Task({ id, title }) {
    return (
        <div className="web-component ">
            <div className="content">
                <div className="task-id">{id}</div>
                <div className="task-title" style={{fontSize:"12px", color:"#4a5568"}}>{title}</div>
                <div className="tags">
                <img src={dot} alt="menu" className="icon-after" />
                    <div className="tag">
                        <div className="icon"><img src={todoIcon} alt="To-do" className="icon-before" /> </div>
                        <span style={{ fontSize: "10px", color: "#4a5568", padding: "0", marginLeft: "5px" }}>Feature Request </span>
                    </div>
                </div>
            </div>
            <img 
                src="https://placehold.co/40x40" 
                alt="Profile icon" 
                className="profile-picture"

                style={{borderRadius:"100px"}}
            />
           
        </div>
    );
}

export default KanbanBoard;
