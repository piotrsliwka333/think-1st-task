import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";

export const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="py-16 px-4">
        <Outlet />
      </main>
    </div>
  );
};
