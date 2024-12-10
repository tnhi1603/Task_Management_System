import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/TaskListPage">TaskListPage</Link>
      <Link to="/TaskDetailPage">TaskDetailPage</Link>
    </nav>
  );
}

export default Navbar;
