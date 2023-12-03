/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import UserModel from '../user/user.model'
import TeamModel from './team.model'

// create cow
const createTeam = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  try {
    const existingUsers = await UserModel.findOne({ _id: payload.users })
    // Check if users are Availability
    if (!existingUsers?.available) {
      return res.status(404).json({ message: 'Availability false' })
    }

    const result = await TeamModel.create({ users: payload.users })
    res.status(201).json({
      success: true,
      message: 'Team created successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

const getTeams = catchAsync(async (req: Request, res: Response) => {
  const result = await TeamModel.find().populate('users')
  res.json({ data: result })
})
const getTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await TeamModel.findOne({ _id: id }).populate('users')
  res.json({ data: result })
})

export const TeamController = { createTeam, getTeam, getTeams }
