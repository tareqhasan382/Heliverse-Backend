/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Request, Response } from 'express'
import { IUser } from './user.interface'
import { UserService } from './user.service'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' User created successfully!',
    data: result,
  })
})

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUsers(req.query)

  res.status(200).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrive successfully !!',
    meta: result.meta,
    data: result.data,
  })
})
const getUser = catchAsync(async (req: Request, res: Response) => {
  const data: any = req.params
  const result = await UserService.getUser(data?.id)

  if (result) {
    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrive in successfully!',
      data: result,
    })
  } else {
    res.status(404).json({ error: 'User not found' })
  }
})
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params
  const payload = req.body

  // await UserService.updateUser(id, payload)

  try {
    const updatedUser = await UserService.updateUser(id, payload)

    if (updatedUser) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User update in successfully!',
      })
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    console.error('Error in patchUser controller:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  // const id = req.params
  const data: any = req.params
  //console.log('payload:', data.id)
  const result = await UserService.deleteUser(data?.id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'data deleted successfully!',
    data: result,
  })
})
export const UserController = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
}
