import { useNavigate } from "@remix-run/react";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex h-16 items-center bg-secondary px-6 shadow">
      <h1
        onClick={() => navigate("/")}
        className="cursor-pointer text-lg font-bold transition-colors hover:text-theme"
      >
        胤•居
      </h1>
    </header>
  );
};

export default Header;
