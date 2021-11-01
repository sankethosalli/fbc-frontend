import Layout from "../components/Layout";
import "../styles/globals.css";
import "react-notifications-component/dist/theme.css";
import ReactNotification from "react-notifications-component";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* <h1>Hello</h1> */}
      <ReactNotification />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
