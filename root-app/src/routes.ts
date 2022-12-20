import { pathToActiveWhen } from "single-spa";
import { RoutesConfig } from "single-spa-layout/dist/types/isomorphic/constructRoutes";

const getLoader = (appName: string) => {
  return `<div>${appName} loading..</div>`;
};

export const getRoutes = (props): RoutesConfig => {
  const routes = {
    mode: "history",
    base: "/",
    disableWarnings: true,
    // containerEl: "#container", // Uncomment if you want to use a main <div id="container" /> html element.
    routes: [
      {
        type: "route",
        path: "/",
        exact: true,
        routes: [
          {
            type: "application",
            name: "@safran/header-app",
            loader: getLoader("header-app"),
          },
          {
            type: "application",
            name: "@safran/content-app",
            loader: getLoader("content-app"),
          },
        ],
        props: {
          text: "This is default message for all child apps from the root-app.",
          auth: props?.auth || {},
        },
      },
      {
        type: "route",
        path: "header",
        routes: [
          {
            type: "application",
            name: "@safran/header-app",
            loader: getLoader("header-app"),
          },
        ],
        props: {
          text: "This is default message for all child apps from the root-app.",
          auth: props?.auth || {},
        },
      },
      {
        type: "route",
        path: "content",
        exact: true,
        routes: [
          {
            type: "application",
            name: "@safran/content-app",
            loader: getLoader("content-app"),
          },
        ],
        props: {
          text: "This is default message for all child apps from the root-app.",
          auth: props?.auth || {},
        },
      },
    ],
  };

  return routes;
};
