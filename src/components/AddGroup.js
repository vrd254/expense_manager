import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from "./Nav";
import axios from "axios";


const AddGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [memberName, setMemberName] = useState('');
    const [members, setMembers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleMemberNameChange = (e) => {
        setMemberName(e.target.value);
    };
    const handleAddMember = async () => {
        if (memberName.trim() !== '') {
            try {
                // Check if the member exists in the user table

                const response = await axios.get(`http://localhost:8080/api/users/checkuser/${memberName.trim()}`);

                console.log(response.data);

                if (response.data!="") {


                    setMemberName('');
                    setErrorMessage('');
                    const userData = response.data;
                    setMembers([...members, userData.username]);

                } else {
                    window.alert("person is not exist");
                }
            } catch (error) {
                console.error('Error checking user:', error);
            }
        }
    };

    const handleRemoveMember = (index) => {
        const updatedMembers = [...members];
        updatedMembers.splice(index, 1);
        setMembers(updatedMembers);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add Group
            console.log(groupName,"Mrm: "+members);
            const groupResponse = await axios.post('http://localhost:8080/api/addgroup', { groupName,members });
            console.log("Group added successfully! " + groupName);

            console.log("Members added to group successfully!");

            // Reset state after successful submission
            setGroupName('');
            setMembers([]);
            console.log("State reset successfully!");
        } catch (error) {
            console.error('Error during Add Group:', error);
        }
    };

    return (
        <>
            <Nav/>
            <div className='dashboard-container'>
                <div className='rounded-blocks'>
                    {/* <div className='left-section'>
                       
                    </div> */}
                    <div className='center-section'>
                        <h2 className='h2'>Create Group</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Enter group name"
                                value={groupName}
                                onChange={handleGroupNameChange}
                                className="inputField"
                            />
                            <br/>
                            <input
                                type="text"
                                placeholder="Enter member name"
                                value={memberName}
                                onChange={handleMemberNameChange}
                                className="inputField"
                            />
                            <button type="button" onClick={handleAddMember} className="addMemberButton">Add Member</button>
                            <br/>
                            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                            {members.map((member, index) => (
                                <div key={index} className="memberItem">
                                    <span>{member}</span>
                                    <button type="button" onClick={() => handleRemoveMember(index)} className="removeMemberButton">Remove</button>
                                </div>
                            ))}
                            <br/>
                            <button type="submit" className="submitButton">Add Group</button>
                        </form>
                    </div>
                    {/* <div className='right-section'>
                        <div className='activities'>
                            <h2 className='h2'></h2>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default AddGroup;