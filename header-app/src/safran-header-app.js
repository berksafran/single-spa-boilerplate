import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Header from "./Header";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: (props) => {
    return <Header {...props} />;
  },
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  domElementGetter,
});

function domElementGetter() {
  return document.getElementById("header-app");
}

export const { bootstrap, unmount, mount } = lifecycles;
