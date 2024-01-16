import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import Categories from '~/models/categories.model'
import { IMessage } from '~/models/message.model'

const categoriesController = {
  setContentType: (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('content-type', 'application/json')
    next()
  },
  getAllCategories: async (req: Request, res: Response) => {
    const categories = await Categories.find({}).lean().exec()
    const response: IMessage = {
      status: httpStatus.OK,
      message: 'Data found',
      data: categories
    }
    res.json(response)
  },
  getCategoryById: async (req: Request, res: Response) => {
    const category = await Categories.findById(req.params.id).lean().exec()
    let status
    let response: IMessage
    if (!category) {
      response = {
        status: httpStatus.NOT_FOUND,
        message: `Data not found with id: ${req.params.id}`
      }
      status = httpStatus.NOT_FOUND
    } else {
      response = {
        status: httpStatus.OK,
        message: 'Data found',
        data: category
      }
      status = httpStatus.OK
    }
    res.status(status).json(response)
  },
  createCategories: async (req: Request, res: Response) => {
    const category = req.body
    let status
    let response: IMessage
    if (!Object.keys(category).length) {
      response = {
        status: httpStatus.BAD_REQUEST,
        message: `Body required`
      }
      status = httpStatus.BAD_REQUEST
    } else {
      const newCategory = await Categories.insertMany(category)
      status = httpStatus.CREATED
      response = {
        status: httpStatus.CREATED,
        message: `Created`,
        data: newCategory
      }
      status = httpStatus.CREATED
    }
    res.status(status).json(response)
  },
  updateCategory: async (req: Request, res: Response) => {
    let status
    let response: IMessage
    const category = req.body
    if (!Object.keys(category).length) {
      response = {
        status: httpStatus.BAD_REQUEST,
        message: `Body required`
      }
      status = httpStatus.BAD_REQUEST
    } else {
      const updateCategory = await Categories.findByIdAndUpdate(req.params.id, category).lean().exec()
      if (!updateCategory) {
        response = {
          status: httpStatus.NOT_FOUND,
          message: `Data not found with id: ${req.params.id}`
        }
        status = httpStatus.NOT_FOUND
      } else {
        response = {
          status: httpStatus.OK,
          message: 'Data updated',
          data: updateCategory
        }
        status = httpStatus.OK
      }
    }
    res.status(status).json(response)
  },
  deleteCategory: async (req: Request, res: Response) => {
    const category = await Categories.findByIdAndDelete(req.params.id).lean().exec()
    let status
    let response: IMessage
    if (!category) {
      response = {
        status: httpStatus.NOT_FOUND,
        message: `Data not found with id: ${req.params.id}`
      }
      status = httpStatus.NOT_FOUND
    } else {
      response = {
        status: httpStatus.OK,
        message: 'Data deleted',
        data: category
      }
      status = httpStatus.OK
    }
    res.status(status).json(response)
  }
}

export default categoriesController
