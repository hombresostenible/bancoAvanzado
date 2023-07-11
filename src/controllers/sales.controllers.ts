//1. Importar el modulo express
import express from 'express';
//2. Importar el arreglo de ventas, espcificando el path del archivo
import { salesDB, sales } from "../../salesDB";
//3. Importar la función que obtiene las venta. Viene de servicios. 
import { getSales, getSalesById, getSalesBydate, postSales, putSales, deleteSales  } from "../services/sales.services";//Traer todos desde servicios

let localSalesDB = salesDB;

const router = express.Router();

// Esta petición de tipo get maneja un query para poner un límite a la cantidad de clientes que se devuelven.
router.get('/sales', async (req, res) => {
  try{
    const response = await getSales(); // Se llama a la función de la capa de servicios que se encarga específicamente de traer los usuarios (getCustomers)

    res.status(response.code).json({ result: response }); // Se devuelve el arreglo de clientes.
  }catch(error){
    console.log(error);
    const salesError = error as {code: number, message: string};
    res.status(salesError.code).json(salesError.message);
  }
});


// Esta petición de tipo get obtiene las ventas por su id.
router.get('/id/:id', async (req,res) => {
  try{
    const id = req.params.id; // Se obtiene el id del parámetro de la petición y se guarda en una variable.
    const response = await 
    getSalesById(id)
    res.status(response.code).json(response.message);
  }catch(error){
    console.log(error);
    const salesError = error as {code: number, message: string};
    res.status(salesError.code).json(salesError.message);
  }
});

// Esta petición de tipo get obtiene las ventas por su fecha.
router.get("/date/:date", async (req,res) => {
  try{
    const date = req.params.date; // Se obtiene el nombre del parámetro de la petición y se guarda en una variable.

    const response = await getSalesBydate(date);//llevar a import
    res.status(response.code).json(response.message);
  }catch(error){
    console.log(error);
    const customError = error as {code: number, message: string};
    res.status(customError.code ).json(customError.message );
  }
});

// Esta petición de tipo post crea un nuevo cliente.
router.post('', async function(req, res) {
  try{
    const body = req.body; // Se obtiene el body de la petición y se guarda en una variable.

    const response = await postSales(body);
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

    const response = await putSales(id, body);
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

    const response = await deleteSales(id);

    res.status(response.code).json(response.message);
  }catch(error){
    console.log(error);
    const customError = error as {code: number, message: string};
    res.status(customError.code ).json(customError.message );
  }
});

export default router;


