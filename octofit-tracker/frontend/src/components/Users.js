import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        console.log('Users endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Users fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setUsers(normalizedData);
      } catch (err) {
        console.error('Users fetch error:', err);
        setError(err.message || 'Unable to fetch users.');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger mb-0">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {users.length === 0 && <li className="list-group-item">No users found.</li>}
          {users.map((user, index) => (
            <li key={user.id || user._id || index} className="list-group-item">
              <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(user, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Users;
