'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || `Failed to fetch users: ${response.status}`);
          return;
        }

        const userData = await response.json();
        setUsers(userData);
      } catch (err) {
        setError(`Error fetching users: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;
  if (users.length === 0) return <div>No users found.</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{user.name}</h3>
          <p>@{user.username}</p>
          {user.email && <p>Email: {user.email}</p>}
        </div>
      ))}
    </div>
  );
}