import mongoose, { Schema, model } from 'mongoose'

export interface ICategory {
  name: string
  description: string
}

const schema: Schema = new Schema<ICategory>({
  name: String,
  description: String
})

const Categories = model<ICategory>('Categories', schema)

export default Categories
