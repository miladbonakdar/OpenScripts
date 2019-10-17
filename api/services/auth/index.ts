import passport from 'passport'
import passportJWT from 'passport-jwt'
import { User } from '../../models/user'
import { Strategy as LocalStrategy } from 'passport-local'
import { API_SECRET } from '../../config'
import { comparePassword } from '../../utils/password'
import { IUser } from '../../models/interfaces/user.interface'

const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy

export default () => {
  const localStrategyMiddleware = async function(
    username: string,
    password: string,
    done: any
  ) {
    let user: IUser | null
    try {
      user = await User.findOne({ email: username })
      if (!user) {
        return done(null, false, { message: 'No user by that username' })
      }
    } catch (e) {
      return done(e)
    }

    let match = await comparePassword(password, user.password)
    if (!match) {
      return done(null, false, { message: 'Not a matching password' })
    }
    delete user.password
    return done(null, user)
  }

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      localStrategyMiddleware
    )
  )

  const JWTStrategyMiddleware = async function(jwtPayload: any, done: any) {
    try {
      const user = await User.findById(jwtPayload.id).select('-password')
      if (!user) {
        return done(null, false, { message: 'cannot fine the user' })
      }
      delete user.password
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: API_SECRET
      },
      JWTStrategyMiddleware
    )
  )
}
