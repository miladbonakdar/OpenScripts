import cors from 'cors'
import { DASHBOARD_ORIGIN, APP_ORIGIN } from '../config'
const allowedOrigins = [DASHBOARD_ORIGIN, APP_ORIGIN]

export default cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg =
        'The CORS policy for this site does not ' +
        'allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  }
})
