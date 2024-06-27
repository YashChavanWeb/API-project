import React, { useState } from 'react';


function ProfileFinder() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>GitHub Profile Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {userData && (
        <div>
          <img src={userData.avatar_url} alt="Profile" style={{ width: '100px', borderRadius: '50%' }} />
          <p><strong>Username:</strong> {userData.login}</p>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Followers:</strong> {userData.followers}</p>
          <p><strong>Following:</strong> {userData.following}</p>
          <p><strong>Public Repos:</strong> {userData.public_repos}</p>
          <p><strong>Profile URL:</strong> <a href={userData.html_url} target="_blank" rel="noopener noreferrer">{userData.html_url}</a></p>
        </div>
      )}
    </div>
  );
}

export default ProfileFinder;
