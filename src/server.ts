import app from "./app";

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(
    `Le server écoute sur http://localhost:${app.get("port")}`,
    `Environement: ${app.get("env")}`
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
