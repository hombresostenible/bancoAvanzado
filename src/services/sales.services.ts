//1. Se importa el arreglo de ventas
import { sales } from "../types/sales.types";

import { readSales, readSalesByid, readSalesBydate, createSales, updateSales, deleteSalesById } from "../data/sales.data";


//3. Función para obtener las ventas 
const getSales = (): Promise<{
    code: number, result: string | sales [] }> => {
        return new Promise((resolve, reject) => {
            readSales()
            .then((response: sales[]) => {
                const localSalesDB = response;
                resolve({code: 200, result: localSalesDB});
            })
            .catch((error) => {
                reject({code: 500, message: "Error inesperado"});
            })
        })
    }

const getSalesById = (id: string): Promise<{code: number, message: string | sales }> => {
    return new Promise((resolve, reject) => {
        readSalesByid(id)
        .then(response => {
            if((response as sales[]).length === 0){
                resolve({ code: 404, message: "Cliente no existe"});
            } else{
                resolve({ code: 200, message: response as sales });
            }
        })
        .catch(error => {
            reject({code: 500, message: "Error inesperado"})
        })
    })
}

const getSalesBydate = (date: string): Promise<{ code: number, message: string | sales }> => {
    return new Promise((resolve, reject) => {
      readSalesBydate(date)
        .then((response) => {
          if((response as sales[]).length === 0){
            resolve({ code: 404 , message: 'Fecha de venta no existe' });
          }else{
            resolve({ code: 200, message: response as sales });
          }
        })
        .catch(error => {
          reject({code: 500, message: "Error inesperado "}); 
        });
    });
  };
  
  const postSales = (body: sales): Promise<{ code: number, message: string }> => {
    return new Promise((resolve, reject) => {
      createSales(body)
        .then((response) => {
          resolve({code: 201, message: response as string });
        })
        .catch(error => {
          reject({code: 500, message: "Error inesperado "}); 
        });
    });
  };
  
  const putSales = (id: string, body: sales): Promise<{ code: number, message: string }> => {
    return new Promise((resolve, reject) => {
      updateSales(id, body)
        .then(response => {
          if(response === 200)(
            resolve({code: 200, message: 'Cliente actualizado exitosamente' as string })
          );
        })
        .catch(error =>{
          if(error === 404){
            reject({ code: 404, message: 'Cliente no encontrado'});
          }else{
            reject({ code: 500, message: 'Unexpected error'});
          }
        });
    });
  };
  
  const deleteSales = (id: string): Promise<{ code: number, message: string }>  => {
    return new Promise((resolve, reject) => {
      deleteSalesById(id)
        .then((response) => {
          if(response === 200){
            resolve({ code: 200, message: "Venta borrada"});
          }
        })
        .catch((error) => {
          if(error === 404){
            reject({code: 404, message: "Cliente al que se le vendió, no existe"});
          }else{
            reject({ code: 500, message: "Error inesperado" });
          }
        });
    });
  };
  
  export {
    getSales,
    getSalesById,
    getSalesBydate,
    postSales,
    putSales,
    deleteSales
  }; // Se exporta la función para que pueda ser usada en otros archivos.