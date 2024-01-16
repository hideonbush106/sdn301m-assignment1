import express, { Request, Response } from 'express'
import categoriesController from '~/controller/categories.controller'

const categoriesRouter = express.Router()

categoriesRouter.route('/').get(categoriesController.getAllCategories).post(categoriesController.createCategories)

categoriesRouter
  .use(categoriesController.setContentType)
  .route('/:id')
  .get(categoriesController.getCategoryById)
  .put(categoriesController.updateCategory)
  .delete(categoriesController.deleteCategory)

export default categoriesRouter
