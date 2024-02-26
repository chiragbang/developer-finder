"use client"
import { useState } from 'react';
import "../Page.css"
import Link from 'next/link';

export default function Home() {
  const [location, setLocation] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/search/users?q=location:${location}`);
      const data = await response.json();
      setUsers(data.items);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    
    <div className='container'>
        <h1>Find Developer in your City</h1>
      <div className='search-bar'>

      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={handleSearch}>Find</button>
      </div>
      <div className='user-list'>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar_url} alt={user.login} />
            <Link href={user.html_url}>{user.login}</Link>
          </li>
        ))}
      </ul>
      </div>
      </div>
    
  );
}

