//1. Importar el arreglo de clientes especificando el path dondfe se encuentra el archivo
import {salesDB} from "../../salesDB";
import { sales } from "../types/sales.types";

//2. Guardar el arreglo de ventas en una variable local
let localSalesDB = salesDB;
//3. Definir la función que obtiene las ventas.

const readSales =  (): Promise<sales[]> => {
    return new Promise((resolve, reject) => {
        try{
            resolve(localSalesDB);
        }
        catch (error){
            reject(error);
        }
    })
}

// Crear constante para acceder a base de datos y filtrar el arreglo de ventas para obtener la venta con el ID solciitado
const readSalesByid = (id: string) =>{
    return new Promise((resolve, reject) => {
        try {
            const result = localSalesDB.filter(item => item.customerId === id);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}
const readSalesBydate = (date: string) =>{
    return new Promise((resolve, reject)=> {
      try {
        const result = localSalesDB.filter(item => item.date === date); // Se filtra el arreglo de clientes para obtener el cliente con el nombre solicitado.
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const createSales = (body: sales) => {
    return new Promise((resolve, reject) => {
      try {
        localSalesDB.push(body);  // Se agrega el cliente al arreglo local.
        resolve('Se ha agregado la venta');
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const updateSales = (id: string, body: sales) => {
    return new Promise((resolve, reject) => {
      try {
        const salesIndex = localSalesDB.findIndex(item => item.customerId === id); // Se busca el índice del cliente a actualizar dentro del arreglo.
        if(salesIndex === -1){ // Si el índice es -1, significa que no existe un cliente con ese id.
          reject(404);
        }else{
          localSalesDB[salesIndex] = body; // Si el índice es diferente a -1, se actualiza el cliente en el arreglo local.
          resolve(200);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const deleteSalesById = (id: string) => {
    return new Promise((resolve, reject) => {
      try {
        const result = localSalesDB.filter(item => item.customerId !== id); // Se filtra el arreglo de clientes para obtener todos los clientes que no tengan el id solicitado.
        if(result.length === localSalesDB.length){ // Si el arreglo resultante tiene la misma cantidad de clientes que el arreglo original, significa que no se eliminó ningún cliente.
          reject(404);
        } else{
          localSalesDB = result;
          resolve(200);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  
  export { 
    readSales,
    readSalesByid,
    readSalesBydate,
    createSales,
    updateSales,
    deleteSalesById
  }; // Se exporta la función para que pueda ser usada en otros archivos.
  