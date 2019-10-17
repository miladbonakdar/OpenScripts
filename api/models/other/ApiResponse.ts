export interface IApiResponse {
  data: Object
  success: boolean
  message: string
}

export default class ApiResponse implements IApiResponse {
  data: Object
  success: boolean
  message: string
  constructor(params: any) {
    this.data = params.data || {}
    this.success = params.success || false
    this.message = params.message || ''
  }
}
