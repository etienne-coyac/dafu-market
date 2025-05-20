import { Outlet } from "react-router";

const AppAdmin = () => {
  return (
    <div>
      <h1>Admin</h1>
      <Outlet />
    </div>
  );
};

export default AppAdmin;
