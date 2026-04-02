import ResourceTable from './ResourceTable';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  return <ResourceTable title="Workouts" endpoint={endpoint} resourceName="Workouts" />;
}

export default Workouts;
