import jwt from 'jsonwebtoken'
import passport from 'passport'
import { API_SECRET } from '../../config'

export default (req: any, res: any) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: any, user: any, info: any) => {
      if (err || !user) {
        res.echo(info.message, null, false, 401)
        return
      }

      req.login(user, { session: false }, (err: any) => {
        if (err) res.internalServerError(err)

        const token = jwt.sign(user.toJSON(), API_SECRET, { expiresIn: '2d' })
        res.success({ user, token }, 'user loged in successfuly')
      })
    }
  )(req, res)
}
