import { NextFunction, Request, Response } from 'express'
import formidable, { Fields } from 'formidable'
import httpStatus from 'http-status'
import Orchids, { IOrchid } from '~/models/orchids.model'
import { capitalToKebab, convertStringToColorArray, kebabToCapital } from '~/utils/common.utils'
const orchidsController = {
  getAllOrchids: async (req: Request, res: Response) => {
    const orchids = await Orchids.find({}).lean()
    if (req.url.includes('manage')) {
      res.render('./partials/manage', {
        orchids: orchids
      })
    } else {
      res.render('./partials/all', {
        orchids: orchids
      })
    }
  },
  getOrchidById: async (req: Request, res: Response) => {
    const orchidName = kebabToCapital(req.params.orchid)
    const orchid = await Orchids.findOne({ name: orchidName })
    if (!orchid) {
      res.render('error')
      return
    }
    res.render('./partials/detail', {
      name: orchid.name,
      price: orchid.price,
      image: orchid.image,
      original: orchid.original,
      isNatural: orchid.isNatural,
      color: orchid.color
    })
  },
  rewriteURL: async (req: Request, res: Response, next: NextFunction) => {
    const orchid = await Orchids.findById(req.params.id).lean().exec()
    if (!orchid) {
      res.render('error')
    }
    const orchidName = capitalToKebab(orchid?.name || '')
    res.redirect(`/orchids/detail/${orchidName}`)
  },
  createOrchids: async (req: Request, res: Response) => {
    const orchid = req.body
    const colorList = convertStringToColorArray(orchid.color)
    const isNatural = 'isNatural' in orchid
    const newOrchid: IOrchid = {
      name: orchid.name,
      image: orchid.image,
      original: orchid.original,
      isNatural: isNatural,
      color: colorList,
      price: orchid.price
    }
    await Orchids.insertMany(newOrchid)
    res.status(httpStatus.CREATED).redirect('/orchids/manage')
  },
  updateOrchid: (req: Request, res: Response) => {
    const form = formidable({})
    form.parse(req, async (err, fields: Fields) => {
      if (err) {
        return
      }
      const isNatural = 'isNatural' in fields
      const colorList = convertStringToColorArray(fields.color![0])
      const newOrchid: IOrchid = {
        name: fields.name![0],
        image: fields.image![0],
        original: fields.original![0],
        isNatural: isNatural,
        color: colorList,
        price: Number(fields.price![0])
      }
      const orchid = await Orchids.findByIdAndUpdate(req.params.id, newOrchid).lean().exec()
      if (!orchid) {
        res.status(httpStatus.NOT_FOUND).render('error')
      } else {
        const orchids = await Orchids.find({}).lean()
        res.status(httpStatus.OK).render('./partials/manage', {
          orchids: orchids
        })
      }
    })
  },
  deleteOrchid: async (req: Request, res: Response) => {
    const orchid = await Orchids.findByIdAndDelete(req.params.id).lean().exec()
    if (!orchid) {
      res.status(httpStatus.NOT_FOUND).render('error')
    }
  }
}

export default orchidsController
