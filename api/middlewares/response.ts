import ApiResponse from '../models/other/ApiResponse'
import { Request, Response, NextFunction } from 'express'

function echo(
  this: Response,
  message: string,
  data: object,
  success: boolean,
  status: number
) {
  this.status(status)
  this.json(
    new ApiResponse({
      data: data,
      success: success,
      message: message
    })
  )
}

function success(
  this: Response,
  data = {},
  message = 'action successfully finished'
) {
  this.echo(message, data, true, 200)
}

function error(this: Response, message = 'somthing bad happend', status = 500) {
  this.echo(message, {}, false, status)
}

function notFound(this: Response, model: string = 'some') {
  this.echo( `${model} Model was not found`, {}, false, 404)
}

function accessDenied(this: Response) {
  this.echo('access denied', {}, false, 403)
}

function badRequest(this: Response, invalidParam = '') {
  this.echo("bad request '" + invalidParam + "'", {}, false, 400)
}

function unauthorized(this: Response) {
  this.echo('user is unauthorized', {}, false, 401)
}

function internalServerError(this: Response, e: any) {
  this.echo(e.message || 'somthing bad happend', {}, false, 500)
}

function noContent(this: Response) {
  this.status(204).send()
}

export default function(_: Request, res: Response, next: NextFunction) {
  res.echo = echo
  res.success = success
  res.error = error
  res.notFound = notFound
  res.accessDenied = accessDenied
  res.badRequest = badRequest
  res.unauthorized = unauthorized
  res.internalServerError = internalServerError
  res.noContent = noContent
  next()
}
