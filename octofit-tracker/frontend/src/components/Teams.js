import ResourceTable from './ResourceTable';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  return <ResourceTable title="Teams" endpoint={endpoint} resourceName="Teams" />;
}

export default Teams;
