import "@styles/globals.css";

import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";

export const metadata = {
  title: "Tattoo.io | AI generated tattoo art",
  description: "Discover & Share AI Art generation Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="eng">
      <head>
        <link rel="icon" href="/assets/images/logo.svg" />
      </head>
      <body>
        <Provider>
          <div className="gradient" />
          <div className="core">
            <div className="core-center">
              <Nav />
            </div>
          </div>

          <main className="app">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
