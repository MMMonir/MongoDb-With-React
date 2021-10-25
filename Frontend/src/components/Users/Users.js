import React, { useEffect, useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);

    //Load data from API
    useEffect(() => {
        fetch('http://localhost:5000/users')
        .then(res => res.json())
        .then(data => setUsers(data))
    }, []);

    //Delete an User
    const handleDeleteUser = id =>{
        // const url = `http://localhost:5000/users/${id}`;
        // fetch(url, {method: 'DELETE'})
        // .then(res => res.json())
        // .then(data => {
        //     if(data.deletedCount> 0){
        //         alert('Deleted successfully');
        //         //Remove user from UI
        //         const remainingUsers = users.filter(user => user._id !== id);
        //         setUsers(remainingUsers);
        //     }
        // })

        //Are you want to Delete Alert, If yes then delete one user
        const proceed = window.confirm('Are you sure, You want to delete?');
        if(proceed){
            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount> 0){
                    alert('Deleted successfully');
                    //Remove user from UI
                    const remainingUsers = users.filter(user => user._id !== id);
                    setUsers(remainingUsers);
                }
            });
        }
    };

    return (
        <div>
            <h2>Users Available: {users.length}</h2>
            <ul>
                {
                    users.map(user => <li key={user._id}>{user.name}, {user.email}
                    &nbsp;&nbsp;<button>Update</button>
                    &nbsp;&nbsp;<button onClick={()=> handleDeleteUser(user._id)}>Delete</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;