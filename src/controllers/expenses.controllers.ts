//1. Importar el modulo express
import express from 'express';

import { expensesDB, expenses } from "../../expensesDB";

import {
    getExpenses, getExpenseBydate, getExpenseByExpenseAmount, getExpenseByExpenseType, postExpense, putExpense, deleteExpense
} from "../services/expenses.services";

const router = express.Router(); 

router.get("", async (req, res) => {
    try{
        const response = await getExpenses();
        res.status(response.code).json({result: response.result});
    }catch(error){
        console.log(error);
        const expenseError = error as {code: number, message: string};
        res.status(expenseError.code).json(expenseError.message);
    }
});

router.get('/date/:date', async (req,res) => {
    try{
      const date = req.params.date; // Se obtiene el id del parámetro de la petición y se guarda en una variable.
  
      const response = await getExpenseBydate(date);    
      res.status(response.code).json(response.message);
    }catch(error){
      console.log(error);
      const customError = error as {code: number, message: string};
      res.status(customError.code ).json(customError.message );
    }
  });
  
  // Esta petición de tipo get obtiene un gasto.
  router.get('/expenseAmount/:expenseAmount', async (req,res) => {
    try{
      const expenseAmount = req.params.expenseAmount;
  
    const response = await getExpenseByExpenseAmount(parseInt(expenseAmount));
      res.status(response.code).json(response.message);
    }catch(error){
      console.log(error);
      const customError = error as {code: number, message: string};
      res.status(customError.code ).json(customError.message );
    }
  });
  
  router.get('/expenseType/:expenseType', async (req,res) => {
    try{
      const expenseType = req.params.expenseType; // Se obtiene el nombre del parámetro de la petición y se guarda en una variable.
  
      const response = await getExpenseByExpenseType(expenseType);
      res.status(response.code).json(response.message);
    }catch(error){
      console.log(error);
      const customError = error as {code: number, message: string};
      res.status(customError.code ).json(customError.message );
    }
  });


  // Esta petición de tipo post crea un nuevo gasto.
  router.post('', async function(req, res) {
    try{
      const body = req.body; // Se obtiene el body de la petición y se guarda en una variable.
  
      const response = await postExpense(body);
      res.status(response.code).json(response.message);
    }catch(error){
      console.log(error);
      const customError = error as {code: number, message: string};
      res.status(customError.code ).json(customError.message );
    }
  });
  
  // Esta petición de tipo put actualiza un cliente, pasándole todo el recurso a editar por el body de la petición.
  router.put('/:id', async function (req, res) {
    try{
      const id = req.params.id; // Se obtiene el id del parámetro de la petición y se guarda en una variable.
      const body = req.body; // Se obtiene el body de la petición y se guarda en una variable.
  
      const response = await putExpense(id, body);
      res.status(response.code).json(response.message);
    }catch(error){
      console.log(error);
      const customError = error as {code: number, message: string};
      res.status(customError.code ).json(customError.message );
    }
  });
  




  // Esta petición de tipo delete elimina un cliente con base en el id pasado por parámetro.
  router.delete('/:id', async function (req, res) {
    try{
      const id = req.params.id;
  
      const response = await deleteExpense(id);
  
      res.status(response.code).json(response.message);
    }catch(error){
      console.log(error);
      const customError = error as {code: number, message: string};
      res.status(customError.code ).json(customError.message );
    }
  });

export default router;





