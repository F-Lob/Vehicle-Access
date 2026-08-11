import express, { urlencoded } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import indexRoutes from "./routes/index.routes.js";
import { setupDB } from "./config/configDB.js";
import { createRoles, createUsers } from "./config/initialSetup.js";
import { handleFatalError, handleError } from "./utils/errorHandler.js";
import { PORT, HOST } from "./config/configEnv.js";
import { url } from "inspector";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupServer() {
  try {
    const server = express();
    server.disable("x-powered-by");

    server.use(cors({ credentials: true, origin: true }));
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cookieParser());
    server.use(morgan("dev"));


    server.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));
    //Usado en el autos si no funciona quedaria unirlo con uploads o algo asi

    server.use("/api", indexRoutes);

    server.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });
  } catch (err) {
    handleError(err, "/server.js -> setupServer");
  }
}

async function setupAPI() {
  try {
    await setupDB();
    await setupServer();
    await createRoles();
    await createUsers();
  } catch (err) {
    handleFatalError(err, "/server.js -> setupAPI");
  }
}

setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));
