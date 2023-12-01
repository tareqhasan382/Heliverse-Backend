import express from 'express'
import { UserController } from './user.controller'
const router = express.Router()
router.get('/users', UserController.getUsers),
  router.get('/user/:id', UserController.getUser),
  router.patch('/user/:id', UserController.updateUser)
router.delete('/user/:id', UserController.deleteUser)
router.post('/user', UserController.createUser)
export const UserRoute = router
