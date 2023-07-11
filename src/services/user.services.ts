import { user } from "../types/user.types";

import { readUsers, readUserByid, readUserByUserName, readUserByUserRole, readUserByEmail, createUsers, updateUsers, deleteUsersById} from "../data/user.data";

const getUsers = (): Promise<{code: number, result: string | user [] }> => {
    return new Promise((resolve, reject) => {
        readUsers()
        .then((response: user[]) => {
            const localUsersDB = response
            resolve({code: 200, result: localUsersDB});
        })
        .catch((error) => {
            reject({code: 500, message: "Error inesperado"});
        })
    })
}

const getUsersById = (id: string): Promise<{code: number, message: string | user }> => {
    return new Promise((resolve, reject) => {
        readUserByid(id)
        .then(response => {
            if((response as user[]).length === 0){
                resolve({ code: 404, message: "Usuario no existe"});
            } else{
                resolve({ code: 200, message: response as user });
            }
        })
        .catch(error => {
            reject({code: 500, message: "Error inesperado"})
        })
    })
}

const getUserByUserName = (date: string): Promise<{ code: number, message: string | user }> => {
    return new Promise((resolve, reject) => {
      readUserByUserName(date)
        .then((response) => {
          if((response as user[]).length === 0){
            resolve({ code: 404 , message: 'Nombre de usuario no existe' });
          }else{
            resolve({ code: 200, message: response as user });
          }
        })
        .catch(error => {
          reject({code: 500, message: "Error inesperado "}); 
        });
    });
  };
  

  const getUserByUserRole = (userRole: string): Promise<{ code: number, message: string | user }> => {
    return new Promise((resolve, reject) => {
      readUserByUserRole(userRole)
        .then((response) => {
          if((response as user[]).length === 0){
            resolve({ code: 404 , message: 'Rol de usuario no existe' });
          }else{
            resolve({ code: 200, message: response as user });
          }
        })
        .catch(error => {
          reject({code: 500, message: "Error inesperado "}); 
        });
    });
  };

  const getUserByEmail = (userEmail: string): Promise<{ code: number, message: string | user }> => {
    return new Promise((resolve, reject) => {
      readUserByEmail(userEmail)
        .then((response) => {
          if((response as user[]).length === 0){
            resolve({ code: 404 , message: 'Email de usuario no existe' });
          }else{
            resolve({ code: 200, message: response as user });
          }
        })
        .catch(error => {
          reject({code: 500, message: "Error inesperado "}); 
        });
    });
  };

  
  const postUser = (body: user): Promise<{ code: number, message: string }> => {
    return new Promise((resolve, reject) => {
      createUsers(body)
        .then((response) => {
          resolve({code: 201, message: response as string });
        })
        .catch(error => {
          reject({code: 500, message: "Error inesperado "}); 
        });
    });
  };
  
  const putUsers = (id: string, body: user): Promise<{ code: number, message: string }> => {
    return new Promise((resolve, reject) => {
      updateUsers(id, body)
        .then(response => {
          if(response === 200)(
            resolve({code: 200, message: 'Usuario actualizado exitosamente' as string })
          );
        })
        .catch(error =>{
          if(error === 404){
            reject({ code: 404, message: 'Usuario no encontrado'});
          }else{
            reject({ code: 500, message: 'Error inesperado'});
          }
        });
    });
  };
  
  const deleteUsers = (id: string): Promise<{ code: number, message: string }>  => {
    return new Promise((resolve, reject) => {
      deleteUsersById(id)
        .then((response) => {
          if(response === 200){
            resolve({ code: 200, message: "Usuario eliminado"});
          }
        })
        .catch((error) => {
          if(error === 404){
            reject({code: 404, message: "Usuario no existe"});
          }else{
            reject({ code: 500, message: "Error inesperado" });
          }
        });
    });
  };
  
export { getUsers, getUserByUserRole, getUserByUserName, getUserByEmail, postUser, putUsers, deleteUsers };
