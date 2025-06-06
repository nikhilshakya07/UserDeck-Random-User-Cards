import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./RandomUser.css"

const RandomUser = () => {

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentpage, setCurrentpage] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://randomuser.me/api/?page=1&results=5");
        setUsers((prevUsers) => [...prevUsers, ...response.data.results])
      } catch (error){
        console.log("Error while fetching Data", error)
      }
      setLoading(false);
    }
    fetchUsers();
  }, [currentpage]);

  const loadMoreUsers = () => {
    setCurrentpage((prevPage) => prevPage + 1);
  };

  return (
    <div className='user-container'>
      <h1>Random Users</h1>
      <div className='user-list'>
        {users.map((users, key) => (
          <div key={key} className='user-card'>
            <img src={users.picture.medium}
            alt = "Userpic"
            className='user-image'/>
            <h2>
              {users.name.first} {users.name.last}
            </h2>
            <p>{users.email}</p>
            </div>
        ))}
      </div>
      {loading && <p className='loading'>Loading...</p>}
      <button className='btn' onClick={loadMoreUsers}>Load More Users</button>
      </div>
  )
}

export default RandomUser