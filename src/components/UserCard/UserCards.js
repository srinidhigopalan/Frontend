import todoIcon from '../icons_FEtask/To-do.svg';
import dot from '../icons_FEtask/menu.svg';
import add from '../icons_FEtask/add.svg';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTicketsByUser } from '../API/api.js'; 
import './UserCards.css'; 

const UserCards = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [users, setUsers] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchTicketsByUser(); 
                const usersArray = Object.entries(data).map(([userId, userData]) => ({
                    id: userId,
                    name: userData.userName,
                    task: userData.tickets[0]?.title || 'No tasks available', 
                    profileImage: 'https://placehold.co/32', 
                    requestCount: userData.tickets.length, 
                    additionalTasks: userData.tickets.slice(1), 
                }));
                setUsers(usersArray); 
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getUsers();
    }, []); 

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleGroupByChange = (event) => {
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
        <div className="container" style={{backgroundColor:"#f7fafc"}}>
            <div className="controls">
                <div className="relative">
                    <button className="display-button" onClick={toggleDropdown}>
                        Display
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
            <div className="card-container" style={{ backgroundColor: "#f7fafc" }}>
    {users.map((user) => (
        <div className="card" key={user.id}>
            <div className="card-header" style={{ backgroundColor: "#f7fafc" }}>
                <div className="user-info" style={{textSize:"12px"}}>
                    <img src={user.profileImage} alt="Profile" className="profile-pic"/>
                    <span className="user-name">{user.name}</span>
                    <span className="request-count">{user.requestCount}  <img src={add} alt="add" className="icon-after" /> 
                    <img src={dot} alt="menu" className="icon-after" /></span>
                </div>
                <div className="actions">
                    <i className="fas fa-ellipsis-h"></i>
                    <i className="fas fa-plus"></i>
                </div>
            </div>
            <div className="task-container">

                <div className="task">
                    <div className="task-id">{user.id}</div>
                    <h3 className="task-title" style={{ fontSize: "15px" }}>{user.task}</h3>
                    <div className="task-details" style={{ display: "flex", alignItems: "center" }}>
                        <img src={dot} alt="Menu" className="icon-before" style={{ width: "10px", height: "10px", marginRight: "5px" }} />
                        <div className="tag" style={{ backgroundColor: "#f7fafc", display: "flex", alignItems: "center" }}>
                            <div className="icon">
                                <img src={todoIcon} alt="To-do" className="icon-before" style={{ width: "10px", height: "10px" }} />
                            </div>
                            <span style={{ fontSize: "10px", color: "#4a5568", padding: "0", marginLeft: "5px" }}>Feature Request</span>
                        </div>
                    </div>
                </div>

                
                {user.additionalTasks && user.additionalTasks.map((task) => (
                    <div className="task" key={task.id}>
                        <div className="task-id">{task.id}</div>
                        <h3 className="task-title" style={{ fontSize: "15px" }}>{task.title}</h3>
                        <div className="task-details" style={{ display: "flex", alignItems: "center" }}>
                            <img src={dot} alt="Menu" className="icon-before" style={{ width: "10px", height: "10px", marginRight: "5px" }} />
                            <div className="tag" style={{ backgroundColor: "#f7fafc", display: "flex", alignItems: "center" }}>
                                <div className="icon">
                                    <img src={todoIcon} alt="To-do" className="icon-before" style={{ width: "10px", height: "10px" }} />
                                </div>
                                <span style={{ fontSize: "10px", color: "#4a5568", padding: "0", marginLeft: "5px" }}>Feature Request</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ))}
</div>

</div>
)
}
export default UserCards;
