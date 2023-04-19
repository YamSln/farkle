import { server } from "./app";
import log from "./config/log";
import serverConfig from "./config/server-config";

const REQUESTOR = "SERVER";
const port = serverConfig.port;
const serverVersion = process.env.npm_package_version;

server.listen(port, () => {
  const serverArt = String.raw`
   _______          _     _       _ 
  (_______)        | |   | |     | |
   _____ ____  ____| |  _| | ____| |
  |  ___/ _  |/ ___| | / | |/ _  |_|
  | |  ( ( | | |   | |< (| ( (/ / _ 
  |_|   \_||_|_|   |_| \_|_|\____|_| __ver ${serverVersion}
 `;
  console.log(serverArt);
  log.info(REQUESTOR, `Server started on port ${port}`);
});
