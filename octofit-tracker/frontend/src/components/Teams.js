import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTeams() {
      try {
        console.log('Teams endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Teams fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setTeams(normalizedData);
      } catch (err) {
        console.error('Teams fetch error:', err);
        setError(err.message || 'Unable to fetch teams.');
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger mb-0">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {teams.length === 0 && <li className="list-group-item">No teams found.</li>}
          {teams.map((team, index) => (
            <li key={team.id || team._id || index} className="list-group-item">
              <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(team, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;
