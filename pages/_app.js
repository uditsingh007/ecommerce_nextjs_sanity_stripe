import { Layout } from "../components";
import "../styles/globals.css";
import { StateContext } from "../Context/StateContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <div>
          <Toaster />
        </div>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
