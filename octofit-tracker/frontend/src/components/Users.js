import ResourceTable from './ResourceTable';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  return <ResourceTable title="Users" endpoint={endpoint} resourceName="Users" />;
}

export default Users;
