import type { FC } from "react";
import { Link, Outlet, useNavigate, NavLink } from "react-router-dom";
import { SignOut } from "@phosphor-icons/react";

const adminNav = [
  { to: "/admin/appointments", label: "Pending Appointments" },
  { to: "/admin/addslot", label: "Add Slot" },
  { to: "/admin/confirmedAppointments", label: "Confirmed Appointments" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/employees", label: "Employees" },
];

export const AdminLayout: FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-[100dvh] bg-canvas text-ink">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-muted hover:text-ink">
              Landing Page
            </Link>
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-[12px] bg-ink px-4 py-2 text-sm font-semibold text-white transition active:scale-[0.98]"
          >
            <SignOut size={16} weight="bold" />
            Logout
          </button>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-3">
          {adminNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-[12px] px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-accent text-white" : "bg-canvas text-ink hover:bg-accent-soft"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
