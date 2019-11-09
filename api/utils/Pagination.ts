import IPage from '../models/other/Page'
export default class Pagination {
  private pageNumber: number
  private pageSize: number
  private query: object
  private sort: object

  constructor(
    public collection: any,
    pageNumber: string | number,
    pageSize: string | number = 10,
    query: object = {},
    sort: object = { _id: -1 }
  ) {
    if (typeof pageNumber == 'string') pageNumber = Number(pageNumber)
    if (typeof pageSize == 'string') pageSize = Number(pageSize)
    this.pageNumber = pageNumber
    this.pageSize = pageSize
    this.query = query
    this.sort = sort
  }

  public async get(): Promise<IPage> {
    const items = await this.collection
      .find(this.query)
      .sort(this.sort)
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
