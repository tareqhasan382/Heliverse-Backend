import { Model, Types } from 'mongoose'

export type ITeam = {
  name: string
  users: Types.ObjectId
}

export type ITeamModel = Model<ITeam, Record<string, unknown>>
