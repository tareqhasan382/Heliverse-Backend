import { Schema, model } from 'mongoose'
import { ITeam, ITeamModel } from './team.interface'

const teamSchema = new Schema<ITeam>(
  {
    // name: { type: String, required: true },
    users: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true }
)

const TeamModel = model<ITeam, ITeamModel>('team', teamSchema)

export default TeamModel
