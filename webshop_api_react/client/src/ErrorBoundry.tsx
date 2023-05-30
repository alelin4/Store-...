/* eslint-disable react/prop-types */
import { Component } from "react";

export default class ErrorBoundry extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Något gick fel</h2>
        </div>
      );
    }
    return this.props.children;
  }
}
