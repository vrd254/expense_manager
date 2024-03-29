import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from "./Nav";
import axios from 'axios';

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [selectedGroupName, setSelectedGroupName] = useState('');

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const uname = localStorage.getItem('uname');
            const response = await axios.get(`http://localhost:8080/api/groups`);
            const filteredGroups = response.data.filter(group => group.members.includes(uname));
            setGroups(filteredGroups);
        } catch (error) {
            console.error('Fetch groups error:', error);
        }
    };

    const handleGroupClick = async (groupId, groupName) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/${groupId}/expenses`);
            setExpenses(response.data);
            setSelectedGroup(groupId);
            setSelectedGroupName(groupName);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    return (
        <>
            <Nav />
            <div className='dashboard-container'>
                <div className='rounded-blocks'>
                    <div className='left-section'>

                    </div>
                    <div className='center-section'>
                        <div className='activities'>
                            <h2>Expenses for Group {selectedGroupName}</h2>
                            {expenses.map((expense, index) => (
                                <div key={index} className="table-wrapper">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th>Paid By</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{expense.description}</td>
                                                <td>{expense.amount}</td>
                                                <td>{expense.createdAt.toString()}</td>
                                                <td>{expense.paidBy}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Member</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(expense.amounts).map(([member, amount]) => (
                                                <tr key={member}>
                                                    <td><strong>{member}</strong></td>
                                                    <td>{amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='right-section'>
                        <div>
                            <h2>Groups</h2>
                            <ul className="group-list h2">
                                {groups.map(group => (
                                    <li
                                        key={group.id}
                                        onClick={() => handleGroupClick(group.id, group.groupName)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '10px',
                                            margin: '5px',
                                            borderRadius: '5px',
                                            transition: 'background 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.background = 'blue';
                                        }}
                                        onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}
                                    >
                                        {group.groupName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link to='/addgroup'>
                            <button className='action-button3'>Add Group</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Groups;
