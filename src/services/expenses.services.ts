import { expenses } from "../types/expenses.types";
import { readExpenses, readExpenseBydate, readExpensesByExpenseAmount, readExpensesByExpenseByType, createExpense, updateExpense, deleteExpenseById } from "../data/expenses.data";

const getExpenses = (): Promise<{code: number, result: string | expenses [] }> => {
    return new Promise((resolve, reject) => {
        readExpenses()
        .then((response: expenses []) => {
            const localExpensesDB = response;
            resolve({ code: 200, result: localExpensesDB})
        })
        .catch((error) => {
            reject({code: 500, message: "Error inesperado"})
        });
    });
};
const getExpenseBydate = (date: string): Promise<{ code: number, message: string | expenses }> => {
    return new Promise((resolve, reject) => {
      readExpenseBydate(date)
        .then(response => {
          if((response as expenses[]).length === 0){
            resolve({ code: 404 , message: 'Gasto no existe' });
          }else{
            resolve({ code: 200, message: response as expenses });
          }
        })
        .catch(error => {
          reject({code: 500, message: "Error inesperado "}); 
        });
    });
  };
  
  const getExpenseByExpenseAmount = (expenseAmount: number): Promise<{ code: number, message: string | expenses }> => {
    return new Promise((resolve, reject) => {
        readExpensesByExpenseAmount(expenseAmount)
        .then((response) => {
          if((response as expenses[]).length === 0){
            resolve({ code: 404 , message: 'Gasto no existe' });
          }else{
            resolve({ code: 200, message: response as expenses });
          }
        })
        .catch(error => {
          reject({code: 500, message: "Error inesperado "}); 
        });
    });
  };
  

  const getExpenseByExpenseType = (expenseType: string): Promise<{ code: number, message: string | expenses }> => {
    return new Promise((resolve, reject) => {
        readExpensesByExpenseByType(expenseType)
        .then((response) => {
          if((response as expenses[]).length === 0){
            resolve({ code: 404 , message: 'Tipo de gasto no existe' });
          }else{
            resolve({ code: 200, message: response as expenses });
          }
        })
        .catch(error => {
          reject({code: 500, message: "Error inesperado "}); 
        });
    });
  };
  

  const postExpense = (body: expenses): Promise<{ code: number, message: string }> => {
    return new Promise((resolve, reject) => {
      createExpense(body)
        .then((response) => {
          resolve({code: 201, message: response as string });
        })
        .catch(error => {
          reject({code: 500, message: "Error inesperado "}); 
        });
    });
  };
  

  const putExpense = (id: string, body: expenses): Promise<{ code: number, message: string }> => {
    return new Promise((resolve, reject) => {
      updateExpense(id, body)
        .then(response => {
          if(response === 200)(
            resolve({code: 200, message: 'Gasto actualizado exitosamente' as string })
          );
        })
        .catch(error =>{
          if(error === 404){
            reject({ code: 404, message: 'Gasto no encontrado'});
          }else{
            reject({ code: 500, message: 'Unexpected error'});
          }
        });
    });
  };
  





  const deleteExpense = (id: string): Promise<{ code: number, message: string }>  => {
    return new Promise((resolve, reject) => {
      deleteExpenseById(id)
        .then((response) => {
          if(response === 200){
            resolve({ code: 200, message: "Gasto borrado"});
          }
        })
        .catch((error) => {
          if(error === 404){
            reject({code: 404, message: "Gasto no existe"});
          }else{
            reject({ code: 500, message: "Error inesperado" });
          }
        });
    });
  };
  

export {
    getExpenses, getExpenseBydate, getExpenseByExpenseAmount, getExpenseByExpenseType, postExpense, putExpense, deleteExpense
};
