/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import UserModel from './user.model'
import { IGenericResponse } from '../../../interface/common'
import { SortOrder } from 'mongoose'
const createUser = async (payload: IUser): Promise<IUser | null> => {
  // console.log('Add payload:', payload)
  const createdUser = await UserModel.create(payload)
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User created Field!')
  }
  return createdUser
}
const getUsers = async (payload: any): Promise<IGenericResponse<IUser[]>> => {
  const {
    page,
    limit,
    searchName,
    gender,
    domain,
    availability,
    sortOrder,
    sortField,
  } = payload
  const options = {
    page: parseInt(page as string),
    limit: parseInt(limit as string),
    // sort: sortOrder ? { [sortOrder as string]: 1 } : {},
    sort: sortOrder
      ? { [sortField as string]: parseInt(sortOrder as string) }
      : {},
  } as {
    page: number
    limit: number
    //sort: { [key: string]: SortOrder | { $meta: 'textScore' } }
    sort: { [key: string]: SortOrder }
  }

  const query: any = {}
  // const query: FilterQuery<IUser> = {}
  // console.log('query:', query)
  if (searchName) {
    query.$or = [
      { first_name: { $regex: searchName, $options: 'i' } },
      { last_name: { $regex: searchName, $options: 'i' } },
    ]
  }

  // Domain, Gender, and Availability
  if (gender) {
    query.gender = gender
  }
  if (domain) {
    query.domain = domain
  }
  if (availability) {
    query.available = availability
  }

  const count = await UserModel.countDocuments(query)
  const result = await UserModel.find(query)
    .sort(options.sort)
    .skip((options.page - 1) * options.limit)
    .limit(options.limit)

  return {
    meta: {
      total: count,
      page: options.page,
      limit: options.limit,
    },
    data: result,
  }
}
const getUser = async (userId: string): Promise<IUser[] | null> => {
  // const isUserExist = await UserModel.find({ _id: userId })
  try {
    const response: any = await UserModel.findOne({ _id: userId })
    return response
  } catch (error) {
    console.error('Error updating user:', error)
    return null
  }
}
const updateUser = async (
  id: any,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  try {
    const updatedUser: any = await UserModel.updateOne(
      { _id: id.id },
      payload,
      { new: true }
    )
    return updatedUser
  } catch (error) {
    console.error('Error updating user:', error)
    return null
  }
}
const deleteUser = async (payload: string): Promise<IUser | null> => {
  // const isUserExist = await UserModel.findByIdAndDelete(payload)
  console.log('payload:', payload)
  try {
    const response: any = await UserModel.deleteOne({ _id: payload })
    return response
  } catch (error) {
    console.error('Error delete user:', error)
    return null
  }
}
export const UserService = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
}
