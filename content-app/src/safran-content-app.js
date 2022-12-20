import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Content from "./Content";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: (props) => {
    return <Content {...props} />;
  },
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  domElementGetter,
});

function domElementGetter() {
  return document.getElementById("content-app");
}

export const { bootstrap, unmount, mount } = lifecycles;
