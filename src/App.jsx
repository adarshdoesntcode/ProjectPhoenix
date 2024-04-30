import AdminLogin from "./features/admin/AdminLogin";
import DefenseLogin from "./features/defense/DefenseLogin";
import Landing from "./features/home/Landing";
import StudentLogin from "./features/student/StudentLogin";
import SupervisorLogin from "./features/supervisor/SupervisorLogin";

export default function App() {
  return (
    <div>
      <StudentLogin />
      {/* <Landing /> */}
      {/* <SupervisorLogin /> */}
      {/* <DefenseLogin /> */}
      {/* <AdminLogin /> */}
    </div>
  );
}
