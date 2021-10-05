import React from "react";
import LocalStorageBrokeFixerUpper from "./LocalStorageBrokeFixerUpper";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong.</h1>
          <p>
            Clear local storage will likely fix the problem{" "}
            <button
              onClick={() => {
                localStorage.clear();
                location.reload();
              }}
            >
              clear
            </button>
          </p>
          <LocalStorageBrokeFixerUpper />
        </>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
