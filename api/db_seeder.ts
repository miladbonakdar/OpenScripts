import chalk from 'chalk'
import connectionProvider from './models/index'
import authInit from './services/auth/init'
import { Course } from './models/course'
import { User, IUserModel } from './models/user'
import { Tag } from './models/tag'
import { Difficulty } from './models/other/Difficulty'
import { Category } from './models/category'
import { randomColor } from './utils/colorGenerator'
import { ADMIN_EMAIL } from './config'

let rootAdmin: IUserModel
const main = async () => {
  const seedArg = process.argv[2]
  await connectionProvider()
  await authInit()

  const res = await User.findOne({
    email: ADMIN_EMAIL
  })
  if (!res)
    throw new Error(
      'root admin cannot be found. please check if it is avalible'
    )

  rootAdmin = res
  switch (seedArg) {
    case '--clear':
      await manager.clear()
      break
    case '--seed-test':
      await manager.seedTestData()
      break
    case '--seed':
      await manager.seedAll()
      break
    case '--clear-seed':
      await manager.clear()
      await manager.seedAll()
      break
    case '--clear-seed-test':
      await manager.clear()
      await manager.seedTestData()
      break
    default:
      log('nothing to do')
      break
  }
  process.exit(0)
}

const log = (message: string) => {
  console.log(chalk.bgCyan('SeedManager'), ' : ', chalk.cyanBright(message))
}

const manager = {
  async seedAll() {
    log('seeding all')
    await categoriesManager.seedCategories()
    await courseManager.seedCourses()
    await tagManager.seedTags()
    log('seeding all completed')
  },
  async clear() {
    log('clear all')
    await categoriesManager.clearCategories()
    await courseManager.clearCourses()
    await tagManager.clearTags()
    log('clear all completed')
  },
  async seedTestData() {
    log('seed all test data')
    await categoriesManager.seedTestCategories()
    await courseManager.seedTestCourses()
    await tagManager.seedTestTags()
    log('seed all test data completed')
  }
}

const tagManager = {
  async seedTags() {
    return Tag.insertMany([
      {
        name: 'docker',
        title: 'docker',
        color: randomColor(),
        createdAt: new Date(),
        createdById: rootAdmin._id,
        posts: []
      }
    ])
  },
  async clearTags() {
    return Tag.deleteMany({})
  },
  async seedTestTags() {
    return Tag.insertMany([
      {
        name: 'docker',
        title: 'Docker',
        color: randomColor(),
        createdAt: new Date(),
        createdById: rootAdmin._id,
        posts: []
      },
      {
        name: 'javascript',
        title: 'Javascript',
        color: randomColor(),
        createdAt: new Date(),
        createdById: rootAdmin._id,
        posts: []
      },
      {
        name: 'noSql',
        title: 'NoSql',
        color: randomColor(),
        createdAt: new Date(),
        createdById: rootAdmin._id,
        posts: []
      },
      {
        name: 'git',
        title: 'Git',
        color: randomColor(),
        createdAt: new Date(),
        createdById: rootAdmin._id,
        posts: []
      }
    ])
  }
}

const courseManager = {
  async seedCourses() {
    return Course.insertMany([])
  },
  async clearCourses() {
    return Course.deleteMany({})
  },
  async seedTestCourses() {
    const cat = await Category.findOne({ name: 'javascript' })
    return Course.insertMany([
      {
        name: 'javascript fundamentals',
        title: 'آموزش مبتدی چاوا اسکریپت',
        color: randomColor(),
        imageUrl:
          'https://lh3.googleusercontent.com/-H1VF0y8GT_XbE-meD8aP3gOut_4RL6ksW92CXzkn1GpRUYpwIRgaPoT-MtNeFtjwOCeZJOPUGMJ0bXWsI4uV5B9ZMvRPUq9eHKhqp9E-gjsFXg6nWx6jeOjJnA9rW_CUeiB3OdVeg=w2400',
        difficulty: Difficulty.easy,
        createdAt: new Date(),
        createdById: rootAdmin._id,
        category: cat
      }
    ])
  }
}

const categoriesManager = {
  async seedCategories() {
    return Category.insertMany([])
  },
  async clearCategories() {
    return Category.deleteMany({})
  },
  async seedTestCategories() {
    return Category.insertMany([
      {
        name: 'javascript',
        title: 'جاوا اسکریپت',
        color: randomColor(),
        imageUrl:
          'https://lh3.googleusercontent.com/9BWLjGaErwZwE8JOI9lVVOHYRO4SUScv-YN4A-GMjX0pmQX8xRSE6FAZtRp_nidGHBoRl6lWwOPgHyAtb-kmZcD-pOM7PNKMM14m2DBR81a0gInjyc0iiS_uAgH8fB5yInEUPDM_zQ=w2400',
        createdAt: new Date(),
        createdById: rootAdmin._id
      }
    ])
  }
}

main()
