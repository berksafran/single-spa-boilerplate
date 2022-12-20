import { registerApplication, start, navigateToUrl } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
// @ts-ignore
import { initAuth } from "@safran/utilities";
import { listenEvents } from "./eventListeners";
import { getRoutes } from "./routes";
// import definedRoutes from "./routes";

// Uncomment the following lines, if you want to use html file as a layout engine.
// import microfrontendLayout from "./microfrontend-layout.html";
// const routes = constructRoutes(microfrontendLayout, layoutData);

initAuth().then((auth: {} | { name: string }) => {
  const routes = constructRoutes(getRoutes({ auth }));

  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      return System.import(name);
    },
  });

  // Delay starting the layout engine until the styleguide CSS is loaded
  const layoutEngine = constructLayoutEngine({
    routes,
    applications,
    active: false,
  });

  applications.forEach(registerApplication);
  layoutEngine.activate();

  // Listen defined single spa default events
  listenEvents();

  start();

  console.log("auth :>> ", Boolean(auth));

  // If "auth" object is empty, navigate to "login" page.
  // navigateToUrl("/login");
});
