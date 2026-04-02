import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        console.log('Workouts endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Workouts fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setWorkouts(normalizedData);
      } catch (err) {
        console.error('Workouts fetch error:', err);
        setError(err.message || 'Unable to fetch workouts.');
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger mb-0">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {workouts.length === 0 && <li className="list-group-item">No workouts found.</li>}
          {workouts.map((workout, index) => (
            <li key={workout.id || workout._id || index} className="list-group-item">
              <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(workout, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;
