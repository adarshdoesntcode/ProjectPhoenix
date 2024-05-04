import { useGetUsersQuery } from "@/api/apiSlice";

import { Link } from "react-router-dom";

function AdminDashboard() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  return (
    <section className="users">
      <h1>Users List</h1>
      {isSuccess && (
        <ul>
          {users.map((user, i) => {
            return <li key={i}>{user.email}</li>;
          })}
        </ul>
      )}

      <Link to="/welcome">Back to Welcome</Link>
    </section>
  );
}

export default AdminDashboard;
