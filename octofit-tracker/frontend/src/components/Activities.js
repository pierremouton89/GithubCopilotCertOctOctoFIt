import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchActivities() {
      try {
        console.log('Activities endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Activities fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setActivities(normalizedData);
      } catch (err) {
        console.error('Activities fetch error:', err);
        setError(err.message || 'Unable to fetch activities.');
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger mb-0">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {activities.length === 0 && <li className="list-group-item">No activities found.</li>}
          {activities.map((activity, index) => (
            <li key={activity.id || activity._id || index} className="list-group-item">
              <pre className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(activity, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;
