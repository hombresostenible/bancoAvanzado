import { expensesDB } from "../../expensesDB";
import { expenses } from "../types/expenses.types";
let localExpensesDB = expensesDB;

const readExpenses = (): Promise<expenses[]> => {
    return new Promise((resolve, reject) => {
        try {
            resolve(localExpensesDB);
        } catch (error) {
            reject(error);
        }
    })
}

const readExpenseBydate = (date: string) =>{
    return new Promise((resolve, reject) => {
      try {
        const result = localExpensesDB.filter(item => item.date === date); // Se filtra el arreglo de clientes para obtener el cliente con el id solicitado.
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
  
  
  const readExpensesByExpenseAmount = (expenseAmount: number) =>{
    return new Promise((resolve, reject)=> {
      try {
        const result = localExpensesDB.filter(item => item.expenseAmount === expenseAmount); // Se filtra el arreglo de clientes para obtener el cliente con el nombre solicitado.
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const readExpensesByExpenseByType = (expenseType: string) =>{
    return new Promise((resolve, reject)=> {
      try {
        const result = localExpensesDB.filter(item => item.expenseType === expenseType); // Se filtra el arreglo de clientes para obtener el cliente con el nombre solicitado.
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };

  const createExpense = (body: expenses) => {
    return new Promise((resolve, reject) => {
      try {
        localExpensesDB.push(body);  // Se agrega el gasto al arreglo local.
        resolve('Se ha agregado gasto');
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const updateExpense = (id: string, body: expenses) => {
    return new Promise((resolve, reject) => {
      try {
        const expenseIndex = localExpensesDB.findIndex(item => item.supplierId === id); // Se busca el índice del cliente a actualizar dentro del arreglo.
        if(expenseIndex === -1){ // Si el índice es -1, significa que no existe un cliente con ese id.
          reject(404);
        }else{
          localExpensesDB[expenseIndex] = body; // Si el índice es diferente a -1, se actualiza el cliente en el arreglo local.
          resolve(200);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  



  const deleteExpenseById = (id: string) => {
    return new Promise((resolve, reject) => {
      try {
        const result = localExpensesDB.filter(item => item.supplierId !== id); // Se filtra el arreglo de clientes para obtener todos los clientes que no tengan el id solicitado.
        if(result.length === localExpensesDB.length){ // Si el arreglo resultante tiene la misma cantidad de clientes que el arreglo original, significa que no se eliminó ningún cliente.
          reject(404);
        } else{
          localExpensesDB = result;
          resolve(200);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  
export {
    readExpenses, readExpenseBydate, readExpensesByExpenseAmount, readExpensesByExpenseByType, createExpense, updateExpense, deleteExpenseById
};
