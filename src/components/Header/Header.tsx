import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header>
      <NavLink to="/">
        <img src="/assets/logo.svg" alt="Logo" />
      </NavLink>
    </header>
  );
};
