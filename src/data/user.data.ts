import { usersDB } from "../../usersDB";
import { user } from "../types/user.types";

let localUsersDB = usersDB;

const readUsers = (): Promise<user[]> => {
    return new Promise((resolve, reject) => {
        try{
            resolve(localUsersDB);
        }
        catch(error){
            reject(error);
        }
    })
};

// Crear constante para acceder a base de datos y filtrar el arreglo de ventas para obtener la venta con el ID solciitado
const readUserByid = (id: string) =>{
    return new Promise((resolve, reject) => {
        try {
            const result = localUsersDB.filter(item => item.id === id);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}
const readUserByUserName = (userName: string) =>{
    return new Promise((resolve, reject)=> {
      try {
        const result = localUsersDB.filter(item => item.userName === userName); // Se filtra el arreglo de clientes para obtener el cliente con el nombre solicitado.
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
  

  const readUserByUserRole = (role: string) =>{
    return new Promise((resolve, reject)=> {
      try {
        const result = localUsersDB.filter(item => item.role === role); 
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };

  const readUserByEmail = (email: string) =>{
    return new Promise((resolve, reject)=> {
      try {
        const result = localUsersDB.filter(item => item.email === email); 
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };


  const createUsers = (body: user) => {
    return new Promise((resolve, reject) => {
      try {
        localUsersDB.push(body);  // Se agrega el usuario al arreglo local.
        resolve('Se ha agregado el usuario');
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const updateUsers = (id: string, body: user) => {
    return new Promise((resolve, reject) => {
      try {
        const usersIndex = localUsersDB.findIndex(item => item.id === id); // Se busca el índice del cliente a actualizar dentro del arreglo.
        if(usersIndex === -1){ // Si el índice es -1, significa que no existe un cliente con ese id.
          reject(404);
        }else{
          localUsersDB[usersIndex] = body; // Si el índice es diferente a -1, se actualiza el cliente en el arreglo local.
          resolve(200);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const deleteUsersById = (id: string) => {
    return new Promise((resolve, reject) => {
      try {
        const result = localUsersDB.filter(item => item.id !== id); // Se filtra el arreglo de usuarios para obtener todos los usuarios que no tengan el id solicitado.
        if(result.length === localUsersDB.length){ 
          reject(404);
        } else{
          localUsersDB = result;
          resolve(200);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  


export { readUsers, readUserByid, readUserByUserName, readUserByUserRole, readUserByEmail, createUsers, updateUsers, deleteUsersById };