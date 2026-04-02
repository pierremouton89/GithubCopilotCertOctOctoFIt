import ResourceTable from './ResourceTable';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  return <ResourceTable title="Activities" endpoint={endpoint} resourceName="Activities" />;
}

export default Activities;
