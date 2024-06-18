import { useNavigate } from "@remix-run/react";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between bg-secondary px-6 shadow">
      <div
        onClick={() => navigate("/")}
        className="group flex cursor-pointer items-center space-x-4"
      >
        <div className="h-10 w-10 overflow-hidden rounded-full bg-comment">
          <img
            src="https://cdn.zengjunyin.com/image/c48de2be-6c0d-438c-9e24-6332d64d0fbc.png"
            alt="avatar"
          />
        </div>
        <h1 className="text-lg font-bold transition-colors group-hover:text-theme sm:text-xl">
          CyberYin's Blog
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div
          onClick={() => navigate("/links")}
          className="cursor-pointer text-primary transition-colors hover:text-theme"
        >
          友链
        </div>
        {/* <div
          onClick={() => navigate("/about")}
          className="cursor-pointer text-primary transition-colors hover:text-theme"
        >
          关于
        </div> */}
      </div>
    </header>
  );
};

export default Header;
