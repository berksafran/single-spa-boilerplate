/* eslint-disable no-console */
/* eslint-disable no-undef */
const cors = require("cors");
const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;
const rootAppPath = path.resolve(__dirname + "/dist");
const isDev = process.env.NODE_ENV === "development";

const app = express();
app.use(cors());

if (isDev) {
  const webpack = require("webpack");
  const webpackConfig = require("./config/webpack.dev.config.js");
  compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      publicPath: rootAppPath,
      stats: true,
    })
  );
  app.use(require("webpack-hot-middleware")(compiler));
  app.use(express.static(rootAppPath));
} else {
  // if NODE_ENV=production ..
  const expressStaticGzip = require("express-static-gzip");
  app.use("/", expressStaticGzip(path.join(__dirname, "dist")));
  app.use("/", expressStaticGzip(path.join(__dirname, "importmaps")));
  //   app.use(
  //     "",
  //     express.static(path.join(__dirname, "dist"), {
  //       extensions: [".js", ".js.map"],
  //     })
  //   );
  //   app.use("", express.static(path.join(__dirname, "importmaps")));
}

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: "dist" });
});

app.get("/health", function (req, res) {
  res.set("content-type", "application/json");
  res.status(200).send(`OK. ${process.env.NODE_ENV}`);
});

app.listen(port, () => {
  console.log(`Root app server is listening on ${port}!`);
  console.log(`NODE_ENV`, process.env.NODE_ENV);
});
