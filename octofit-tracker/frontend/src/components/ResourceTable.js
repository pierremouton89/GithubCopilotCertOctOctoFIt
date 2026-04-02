import { useCallback, useEffect, useMemo, useState } from 'react';

function ResourceTable({ title, endpoint, resourceName }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      console.log(`${resourceName} endpoint:`, endpoint);
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(`${resourceName} fetched data:`, data);

      const normalizedData = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];

      setRecords(normalizedData);
    } catch (err) {
      console.error(`${resourceName} fetch error:`, err);
      setError(err.message || `Unable to fetch ${resourceName.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  }, [endpoint, resourceName]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const filteredRecords = useMemo(() => {
    if (!query.trim()) {
      return records;
    }

    const loweredQuery = query.toLowerCase();
    return records.filter((record) => JSON.stringify(record).toLowerCase().includes(loweredQuery));
  }, [records, query]);

  const rowPreview = (record) => {
    const keys = Object.keys(record || {}).slice(0, 3);
    if (keys.length === 0) {
      return 'No preview fields available';
    }

    return keys.map((key) => `${key}: ${String(record[key])}`).join(' | ');
  };

  return (
    <section className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <h2 className="h3 mb-0">{title}</h2>
            <a className="btn btn-link btn-sm link-primary text-decoration-none" href={endpoint} target="_blank" rel="noreferrer">
              REST Endpoint
            </a>
          </div>

          <form
            className="row g-2 align-items-end mb-3"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="col-12 col-md-8">
              <label htmlFor={`${resourceName}-search`} className="form-label fw-semibold">Search {title}</label>
              <input
                id={`${resourceName}-search`}
                type="text"
                className="form-control"
                placeholder="Filter records by any field"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-6 col-md-2 d-grid">
              <button type="button" className="btn btn-outline-secondary" onClick={() => setQuery('')}>
                Clear
              </button>
            </div>
            <div className="col-6 col-md-2 d-grid">
              <button type="button" className="btn btn-primary" onClick={fetchRecords}>
                Refresh
              </button>
            </div>
          </form>

          {loading && (
            <div className="alert alert-info mb-0" role="status">
              Loading {title.toLowerCase()}...
            </div>
          )}

          {error && (
            <div className="alert alert-danger mb-0" role="alert">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0 octofit-table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Record ID</th>
                    <th scope="col">Preview</th>
                    <th scope="col" className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-secondary py-4">
                        No matching {title.toLowerCase()} found.
                      </td>
                    </tr>
                  )}
                  {filteredRecords.map((record, index) => (
                    <tr key={record.id || record._id || index}>
                      <td>{index + 1}</td>
                      <td>{record.id || record._id || 'N/A'}</td>
                      <td className="text-break">{rowPreview(record)}</td>
                      <td className="text-end">
                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => setSelectedRecord(record)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedRecord && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title h5 mb-0">{title} Record Details</h3>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedRecord(null)} />
              </div>
              <div className="modal-body">
                <pre className="mb-0">{JSON.stringify(selectedRecord, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedRecord(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedRecord && <div className="modal-backdrop fade show" onClick={() => setSelectedRecord(null)} />}
    </section>
  );
}

export default ResourceTable;
