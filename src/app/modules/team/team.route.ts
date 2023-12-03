import express from 'express'
import { TeamController } from './team.controller'
const router = express.Router()
router.get('/team/:id', TeamController.getTeam),
  router.get('/teams', TeamController.getTeams),
  //   router.patch('/user/:id', UserController.updateUser)
  // router.delete('/user/:id', UserController.deleteUser)
  router.post('/team', TeamController.createTeam)
export const teamRoute = router
