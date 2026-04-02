import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        console.log('Leaderboard endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Leaderboard fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setLeaderboard(normalizedData);
      } catch (err) {
        console.error('Leaderboard fetch error:', err);
        setError(err.message || 'Unable to fetch leaderboard data.');
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger mb-0">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {leaderboard.length === 0 && <li className="list-group-item">No leaderboard entries found.</li>}
          {leaderboard.map((entry, index) => (
            <li key={entry.id || entry._id || index} className="list-group-item">
              <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(entry, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Leaderboard;
