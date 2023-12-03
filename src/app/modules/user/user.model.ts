import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    avatar: { type: String, required: true },
    domain: { type: String, required: true },
    available: { type: Boolean, required: true },
  },
  { timestamps: true }
)

const UserModel = model<IUser, IUserModel>('users', userSchema)
export default UserModel
