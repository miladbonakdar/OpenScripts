import IPage from '../models/other/Page'
export default class Pagination {
  public pageNumber: number
  public pageSize: number
  public query: object

  constructor(
    public collection: any,
    pageNumber: string | number,
    pageSize: string | number = 20,
    query: object = {}
  ) {
    if (typeof pageNumber == 'string') pageNumber = Number(pageNumber)
    if (typeof pageSize == 'string') pageSize = Number(pageSize)
    this.pageNumber = pageNumber
    this.pageSize = pageSize
    this.query = query
  }

  public async get(): Promise<IPage> {
    const items = await this.collection
      .find(this.query)
      .sort('-createdAt')
      .skip(this.pageNumber * this.pageSize)
      .limit(this.pageSize)
      .exec()
    const total = await this.collection.countDocuments(this.query)
    return {
      items: items,
      count: items.length,
      total: total
    }
  }
}
