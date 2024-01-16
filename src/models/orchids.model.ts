import { Document, Schema, model } from 'mongoose'

export interface IOrchid {
  name: string
  image: string
  price: number
  original: string
  isNatural: boolean
  color: string[]
}

const schema: Schema = new Schema<IOrchid>({
  name: String,
  image: String,
  price: Number,
  original: String,
  isNatural: Boolean,
  color: Array<string>
})

const Orchids = model<IOrchid>('Orchids', schema)

export default Orchids
