import { Request, Response } from 'express'
import { Post } from '../../models/post'
import Pagination from '../../utils/Pagination'
import SearchFilters from '../SearchFilters'

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
  let findQuery: any = { published: true }
  if (params.search) {
    findQuery = {
      ...findQuery,
      $or: [
        { title: { $regex: '.*' + params.search + '.*' } },
        { course: { title: { $regex: '.*' + params.search + '.*' } } },
        { category: { title: { $regex: '.*' + params.search + '.*' } } }
      ]
    }
  }

  if (params.category) {
    findQuery = {
      ...findQuery,
      category: { title: params.category }
    }
  }

  if (params.course) {
    findQuery = {
      ...findQuery,
      course: { title: params.course }
    }
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
    { $match: { published: true } },
    { $sort: { claps: -1 } },
    { $limit: 20 },
    { $sample: { size: Number(req.params.size) } }
  ])
  res.success(posts)
}

export const mostViewes = async (req: Request, res: Response) => {
  const posts = await Post.aggregate([
    { $match: { published: true } },
    { $sort: { views: -1 } },
    { $limit: 20 },
    { $sample: { size: Number(req.params.size) } }
  ])
  res.success(posts)
}

export const randomPosts = async (req: Request, res: Response) => {
  const posts = await Post.aggregate([
    { $match: { published: true } },
    { $sample: { size: Number(req.params.size) } }
  ])
  res.success(posts)
}

export const pagePosts = async (req: Request, res: Response) => {
  let filter = SearchFilters(req, { published: true })
  const size = Math.max(Math.min(Number(req.params.size), 10), 2)
  const number = Math.max(Number(req.params.number), 1) - 1
  const pagination = new Pagination(Post, number, size, filter, {
    createdAt: -1
  })
  const posts = await pagination.get()
  res.success(posts)
}
