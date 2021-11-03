import "../styles/globals.css";
import ErrorBoundary from "../components/ErrorBoundary";
import "normalize.css";

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />

      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
