import express, { Request, Response } from 'express'
import orchidsController from '~/controller/orchids.controller'

const orchidsRouter = express.Router()
orchidsRouter.route('/').get(orchidsController.getAllOrchids).post(orchidsController.createOrchids)
orchidsRouter.route('/manage').get(orchidsController.getAllOrchids)
orchidsRouter.route('/detail/:orchid').get(orchidsController.getOrchidById)
orchidsRouter
  .route('/:id')
  .get(orchidsController.rewriteURL)
  .put(orchidsController.updateOrchid)
  .delete(orchidsController.deleteOrchid)

export default orchidsRouter
