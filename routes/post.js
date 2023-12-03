import  express  from "express";
import {getAllUser , createUser , deleteUser , deleteAllUser , updateUser , getOneUser , userLogin} from "../controller/userController.js";

const routes = express.Router()

routes.get('/getAll' , getAllUser)

routes.post('/create-user' , createUser)

routes.delete('/delete-user/:id' , deleteUser)

routes.delete('/delete-All-user' , deleteAllUser)

routes.patch('/update-user/:id' , updateUser)

routes.get('/getone-user/:id' , getOneUser)

routes.post('/login-user' , userLogin)

// routes.get('/' , (req,res) => {
//     res.send('this path is working')
// })

// routes.get('/all-data' , (req,res) => {
//     res.send('this is all data-path')
// })

export default routes;
