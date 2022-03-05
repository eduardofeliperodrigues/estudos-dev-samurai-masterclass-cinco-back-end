import { Router } from "express";

import auth from "./middlewares/auth";

import HelloController from './controllers/HelloController'
import SessionController from "./controllers/SessionController";
import UsersController from "./controllers/UsersController";
import RepositoryController from "./controllers/RepositoryController";

const routes = new Router()

routes.get('/hello', HelloController.index);
routes.post('/session', SessionController.create);

routes.use(auth)

routes.get('/users', UsersController.listAll);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.destroy);

routes.get('/users/:userId/repositories', RepositoryController.listAllRepositoriesOfAnUser);
routes.post('/users/:userId/repositories', RepositoryController.create);
routes.delete('/users/:userId/repositories/:repoId', RepositoryController.destroy);


export default routes;