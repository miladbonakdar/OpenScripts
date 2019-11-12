import { Request, Response } from 'express'
import { Post } from '../../models/post'
import Pagination from '../../utils/Pagination'

const getRequestParams = (req: Request) => {
  const params = {
    pageNumber: Math.max(Number(req.params.pageNumber), 0),
    pageSize: Math.max(Number(req.params.pageSize), 1),
    search: req.query.search || null,
    category: req.query.category || null,
    course: req.query.course || null
  }

  return params
}

export const getPosts = async (req: Request, res: Response) => {
  const params = getRequestParams(req)
  let findQuery: any = {}
  if (params.search) {
    findQuery = {
      $or: [
        { title: { $regex: '.*' + params.search + '.*' } },
        { course: { title: { $regex: '.*' + params.search + '.*' } } },
        { category: { title: { $regex: '.*' + params.search + '.*' } } }
      ]
    }
  }

  if (params.category) {
    findQuery = { category: { title: params.category } }
  }

  if (params.course) {
    findQuery = { course: { title: params.course } }
  }

  const pagination = new Pagination(
    Post,
    params.pageNumber,
    params.pageSize,
    findQuery,
    { createdAt: -1 }
  )

  const posts = await pagination.get()

  return res.success(posts)
}

export const popularPosts = async (req: Request, res: Response) => {
  const posts = await Post.aggregate([
    { $sort: { claps: -1 } },
    { $limit: 20 },
    { $sample: { size: Number(req.params.size) } }
  ])
  res.success(posts)
}

export const mostViewes = async (req: Request, res: Response) => {
  const posts = await Post.aggregate([
    { $sort: { views: -1 } },
    { $limit: 20 },
    { $sample: { size: Number(req.params.size) } }
  ])
  res.success(posts)
}

export const randomPosts = async (req: Request, res: Response) => {
  const posts = await Post.aggregate([
    { $sample: { size: Number(req.params.size) } }
  ])
  res.success(posts)
}
