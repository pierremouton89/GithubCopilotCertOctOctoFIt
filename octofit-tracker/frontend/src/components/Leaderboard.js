import ResourceTable from './ResourceTable';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  return <ResourceTable title="Leaderboard" endpoint={endpoint} resourceName="Leaderboard" />;
}

export default Leaderboard;
