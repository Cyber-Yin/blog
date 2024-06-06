export default function AboutPage() {
  return (
    <>
      <div className="mx-auto aspect-square w-72 overflow-hidden rounded-lg">
        <img
          className="h-full w-full"
          src="https://cdn.zengjunyin.com/image/about.jpg"
          alt="about"
        />
      </div>
      <div className="w-full text-center text-xl font-bold sm:text-2xl">胤</div>
      <div className="w-full space-y-6 overflow-hidden rounded-lg bg-secondary p-4">
        <h2 className="text-lg font-bold sm:text-xl">关于我</h2>
        <p className="w-full text-justify text-sm/8 sm:text-base/8">
          厦门大学毕业，学位本科，专业哲学。现在是一名全栈开发者，前端框架擅长使用{" "}
          <a
            href="https://react.dev"
            target="_blank"
            className="text-primary transition-colors hover:text-theme"
          >
            React
          </a>
          ，后端擅长使用{" "}
          <a
            href="https://nodejs.org"
            target="_blank"
            className="text-primary transition-colors hover:text-theme"
          >
            Node.js
          </a>
          ，会一点{" "}
          <a
            href="https://www.rust-lang.org"
            target="_blank"
            className="text-primary transition-colors hover:text-theme"
          >
            Rust
          </a>
          。第一份工作从事的是 Web3 开发，时长 1
          年，主链为比特币链，主要方向是比特币铭文生态开发，目前对比特币底层知识有较多了解。
        </p>
        <h2 className="text-lg font-bold sm:text-xl">问答</h2>
        <div className="w-full text-justify text-sm/8 sm:text-base/8">
          问：为什么从哲学转行到计算机？
          <br />
          答：纯粹个人爱好，哲学中有个二级学科叫数理逻辑，恰好我对这个比较感兴趣，抛开形式来谈，很多定理的证明和计算机基础运算的本质是相通的，例如与、或、非、异或，只是计算机除了逻辑运算还有算术运算。
        </div>
        <div className="w-full text-justify text-sm/8 sm:text-base/8">
          问：为什么留长发？
          <br />
          答：不想一天洗一次头。
        </div>
      </div>
    </>
  );
}
