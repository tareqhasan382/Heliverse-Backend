import { Model } from 'mongoose'

export type IUser = {
  _id?: string
  first_name: string
  last_name: string
  email: string
  gender: string
  avatar: string
  domain: string
  available: boolean
}

export type IUserModel = Model<IUser, Record<string, unknown>>
