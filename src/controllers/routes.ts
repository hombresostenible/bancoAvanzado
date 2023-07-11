import express from 'express';

import salesControllers from './sales.controllers';
import expensesControllers from "./expenses.controllers";
import usersControllers from "./user.controllers";

function routerApi(app: express.Application){
  //const router = express.Router();
  app.use("/sales", salesControllers);
  app.use("/expenses", expensesControllers );
  app.use("/user", usersControllers);
}

export { routerApi };