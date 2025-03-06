import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="flex justify-center bg-white px-4">
      <div className="flex items-center justify-between max-w-7xl w-full py-2">
        <NavLink to="/" className="w-[120px] block">
          <img src="/assets/logo.svg" className="w-full" alt="Logo" />
        </NavLink>

        <nav>
          <ul className="flex gap-4">
            <li>
              <NavLink className="p-3 block" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="p-3 block bg-primary text-white rounded-md"
                to="/workouts"
              >
                Workouts
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
