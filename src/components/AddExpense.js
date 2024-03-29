import React, { useEffect, useState } from 'react';
import Nav from "./Nav";
import axios from 'axios';

const AddExpense = () => {
    const [groups, setGroups] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState('');
    const [equallySplit, setEquallySplit] = useState(true);
    const [amounts, setAmounts] = useState({});
    const [error, setError] = useState('');
    const [selectedGroupEntity,setSelectedGroupEntity]=useState([]);

    useEffect(() => {
      fetchGroups();

      handleEquallySplitChange();
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



  const fetchGroupMembers = async (selectedGroupId) => {
      try {
          const response = await axios.get(`http://localhost:8080/api/groups/${selectedGroupId}/members`);
          console.log(response.data);
          setGroupMembers(response.data);
      } catch (error) {
          console.error('Fetch group members error:', error);
      }
  };


  const fetchGroupById = async (selectedGroupId) => {
      try {
          const response = await axios.get(`http://localhost:8080/api/groups1/${selectedGroupId}`);
          console.log(response.data);
          setSelectedGroupEntity(response.data);
      } catch (error) {
          console.error('Fetch group by ID error:', error);
          throw error;
      }
  };
  // const updateOwn =async ()=> {
  //     const uname = localStorage.getItem('uname');
  //     console.log("in updateOwn"+amount);
  //     const response2 = await axios.put(`http://localhost:8080/api/ownamt/${uname}/${amount}`);
  //     // console.log(response2.data.ownAmount+"jayy chhe.");
  // }

  const updateOwe = async () => {
      const uname = localStorage.getItem('uname');
      console.log("in updateOwe" + amounts.arpan);
      const response1 = await axios.put(`http://localhost:8080/api/oweamt/${uname}/${amount}`, amounts);
      console.log(amount + "jay chhe.");
  }
  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateAmounts()) {
          window.alert('Total amount for each member must be equal to the overall amount.');
          return;
      }

      try {
          const amountsArray = Object.entries(amounts).map(([member, amount]) => ({ [member]: parseFloat(amount) }));
          const formattedAmounts = Object.assign({}, ...amountsArray);

          const currentDate = new Date();
          const hours = currentDate.getHours();
          const minutes = currentDate.getMinutes();
          const seconds = currentDate.getSeconds();
          const day = currentDate.getDate();
          const month = currentDate.getMonth() + 1; // Adding 1 to month because months are zero-indexed
          const year = currentDate.getFullYear();
          const addLeadingZero = (num) => {
              return num < 10 ? "0" + num : num;
          };
          const formattedString = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}-${addLeadingZero(day)}/${addLeadingZero(month)}/${year}`;

          const response = await fetch('http://localhost:8080/api/expenses', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  group: selectedGroupEntity,
                  description,
                  amount: parseFloat(amount),
                  paidBy: equallySplit ? 'equally' : 'unequally',
                  amounts: formattedAmounts,
                  createdAt: formattedString,
              }),
          });




          if (!response.ok) {
              throw new Error('Failed to add expense. Please try again.');
          }

          // updateOwn();
          updateOwe();
          const responseData = await response.json();

          // Handle successful expense addition (e.g., show success message)
          console.log('Expense added successfully:', responseData);

          setDescription('');
          setAmount('');
          setSelectedGroup('');
          setSelectedMembers([]);
          setAmounts({});
          setEquallySplit(true);
          setError('');
      } catch (error) {
          setError('Failed to add expense. Please try again.');
          console.error('Add expense error:', error);
      }
  };


  const validateAmounts = () => {
      if (equallySplit) {
          // In case of equally split, no need for validation
          return true;
      }

      // Calculate the total amount entered for each member
      const totalAmountForMembers = Object.values(amounts)
          .filter((amount) => amount !== '')
          .reduce((acc, curr) => acc + parseFloat(curr), 0);

      // Check if the total amount for each member is equal to the overall amount
      return parseFloat(totalAmountForMembers) === parseFloat(amount);
  };

  const handleCheckboxChange = (member) => {
      const updatedMembers = [...selectedMembers];

      if (updatedMembers.includes(member)) {
          updatedMembers.splice(updatedMembers.indexOf(member), 1);
      } else {
          updatedMembers.push(member);
      }

      setSelectedMembers(updatedMembers);


  };

  const handleEquallySplitChange = () => {
      setEquallySplit(!equallySplit);

      const equalAmount = parseFloat(amount) / groupMembers.length;
      if(!equallySplit) {
          groupMembers.forEach(member => {
              setAmounts((prevAmounts) => ({
                  ...prevAmounts,
                  [member]: equalAmount,
              })
              );
          });
      }
  };

  const handleGroupChange = async (e) => {
      const selectedGroupId = e.target.value;
      setSelectedGroup(e.target.value);
      console.log(selectedGroupId);
      if (selectedGroupId) {
          try {
              fetchGroupById(selectedGroupId);
              fetchGroupMembers(selectedGroupId);

              // Now you have the details of the selected group in the selectedGroup variable
              console.log('Selected Group:', selectedGroupEntity);


              // If needed, you can perform additional actions with the group details here
          } catch (error) {
              console.error('Failed to fetch group by ID:', error);
          }
      } else {
          setGroupMembers([]);
      }
  };

  const handleAmountChange = (member, value) => {


          setAmounts((prevAmounts) => ({
              ...prevAmounts,
              [member]: value,
          }));

  };

  const amountForMember = (member) => amounts[member] || '';

    return (
        <>
        <Nav/>
        <div className='dashboard-container'>
      <div className='rounded-blocks'>
        
        <div className='center-section'>
          <h2 className='h2'>Add Expense</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-element">
              <label className="label h2">Select Group:</label>
              <select className="select" value={selectedGroup} onChange={handleGroupChange}>
                <option value="">Select a group</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.groupName}</option>
                ))}
              </select>
            </div>
            <div className="form-element">
              <label className="label h2">Description:</label>
              <input className="input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-element">
              <label className="label h2">Amount:</label>
              <input className="input" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="form-element">
              <label className="label h2">Paid By</label>
              {equallySplit ? (
                <div>
                  <input
                    type="checkbox"
                    id="equallySplitCheckbox"
                    checked={equallySplit}
                    onChange={handleEquallySplitChange}
                  />
                  <label htmlFor="equallySplitCheckbox" className='h2'>Equally Split</label>
                </div>
              ) : (
                <>
                  <div>
                    <input
                      type="checkbox"
                      id="equallySplitCheckbox"
                      checked={equallySplit}
                      onChange={handleEquallySplitChange}
                    />
                    <label htmlFor="equallySplitCheckbox" className='h2'>Equally Split</label>
                  </div>
                  {groupMembers.map(member => (
                    <div key={member} className="checkbox h2">
                      <input
                        type="checkbox"
                        id={member}
                        value={member}
                        checked={selectedMembers.includes(member)}
                        onChange={() => handleCheckboxChange(member)}
                      />
                      <label htmlFor={member}>{member}</label>
                      <input
                        type="number"
                        placeholder="Amount"
                        value={amountForMember(member)}
                        onChange={(e) => handleAmountChange(member, e.target.value)}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
            {error && <p className="error">{error}</p>}
            <button className="button" type="submit">Add Expense</button>
          </form>
        </div>
        
      </div>
    </div>        </>
    );
};

export default AddExpense;
