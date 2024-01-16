import mongoose from 'mongoose'

const dbConnect = async (url: string | undefined) => {
  try {
    await mongoose.connect(url || '')
  } catch (error) {
    console.log(error)
  }
}

export default dbConnect
