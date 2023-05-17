import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max_md:hidden" />
        <span className="orange_gradient">AI-Powered Tattoos</span>
      </h1>
      <p className="desc text-center">
        Tattoo.io is an open-source AI prompting tool for modern world to
        discover, create and share creative Tattoo Art and Prompts.
      </p>
      <Feed />
    </section>
  );
};
export default Home;
