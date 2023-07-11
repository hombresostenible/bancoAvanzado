import express  from "express";
import { usersDB, user } from "../../usersDB";
import { getUsers, getUserByUserRole, getUserByUserName, getUserByEmail, postUser, putUsers, deleteUsers } from "../services/user.services";

let localUsersDB = usersDB;
const router = express.Router();

router.get('/user', async (req, res) => {
    try{
      const response = await getUsers(); // Se llama a la función de la capa de servicios que se encarga específicamente de traer los usuarios.
  
      res.status(response.code).json({ result: response }); // Se devuelve el arreglo de usuarios.
    }catch(error){
      console.log(error);
      const userError = error as {code: number, message: string};
      res.status(userError.code).json(userError.message);
    }
  });
  
  
  router.get('/userRole/:userRole', async (req,res) => {
    try{
      const id = req.params.userRole; 
      const response = await 
      getUserByUserRole(id)
      res.status(response.code).json(response.message);
    }catch(error){
      console.log(error);
      const salesError = error as {code: number, message: string};
      res.status(salesError.code).json(salesError.message);
    }
  });
  
  
  router.get("/userName/:userName", async (req,res) => {
    try{
      const userName = req.params.userName;   
      const response = await getUserByUserName(userName);
      res.status(response.code).json(response.message);
    }catch(error){
      console.log(error);
      const customError = error as {code: number, message: string};
      res.status(customError.code ).json(customError.message );
    }
  });
  
  router.get("/email/:email", async (req,res) => {
    try{
      const email = req.params.email;   
      const response = await getUserByEmail(email);
      res.status(response.code).json(response.message);
    }catch(error){
      console.log(error);
      const customError = error as {code: number, message: string};
      res.status(customError.code ).json(customError.message );
    }
  });


  router.post('', async function(req, res) {
    try{
      const body = req.body;  
      const response = await postUser(body);
      res.status(response.code).json(response.message);
    }catch(error){
      console.log(error);
      const customError = error as {code: number, message: string};
      res.status(customError.code ).json(customError.message );
    }
  });
  
  router.put('/:id', async function (req, res) {
    try{
      const id = req.params.id; 
      const body = req.body;   
      const response = await putUsers(id, body);
      res.status(response.code).json(response.message);
    }catch(error){
      console.log(error);
      const customError = error as {code: number, message: string};
      res.status(customError.code ).json(customError.message );
    }
  });
  
  router.delete('/:id', async function (req, res) {
    try{
      const id = req.params.id;
  
      const response = await deleteUsers(id);
  
      res.status(response.code).json(response.message);
    }catch(error){
      console.log(error);
      const customError = error as {code: number, message: string};
      res.status(customError.code ).json(customError.message );
    }
  });
  
  export default router;
