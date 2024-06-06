const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center space-y-4 bg-secondary px-6 py-6 text-sm/6 sm:text-base">
      <div>©️ 2024 胤 版权所有</div>
      <a
        className="transition-colors hover:text-theme"
        target="_blank"
        referrerPolicy="no-referrer"
        href="https://beian.miit.gov.cn"
      >
        闽 ICP 备 2021019269 号
      </a>
    </footer>
  );
};

export default Footer;
