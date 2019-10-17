import * as dotenv from 'dotenv'
dotenv.config()

export const DB_NAME = process.env.DB_NAME || ''
export const DB_USERNAME = process.env.DB_USERNAME || ''
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_HOST = process.env.DB_HOST || ''
export const DB_PORT = process.env.DB_PORT || ''
export const API_PORT = process.env.API_PORT || ''
export const API_SECRET = process.env.API_SECRET || ''

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || ''
export const ADMIN_PASS = process.env.ADMIN_PASS || ''

export const DASHBOARD_ORIGIN = process.env.DASHBOARD_ORIGIN || ''
export const APP_ORIGIN = process.env.APP_ORIGIN || ''
