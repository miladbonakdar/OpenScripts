import { User } from '../../models/user'
import { hashPassword } from '../../utils/password'
import { ADMIN_EMAIL, ADMIN_PASS } from '../../config'

export default async () => {
  const users = await User.countDocuments({
    email: ADMIN_EMAIL
  })
  if (users >= 1) return

  //replace with your detail
  const user = new User({
    firstName: 'milawd',
    lastName: 'bonakdar',
    telegramId: 0,
    email: ADMIN_EMAIL,
    password: await hashPassword(ADMIN_PASS),
    info: '',
    photoUrl:
      'https://lh3.googleusercontent.com/dWMiD3pEsGPbN3teWSQinzLHhDK4iNh1_HbUtURN7ovb9fvnBvvY7098S160Vam1MthGTK0YQ-4Ytf1bRkUHo2hT3FZRq_aGIH-eNWoPigDMAvOEQ3KZdiSyDIQ7Gn2SxNGCbCGjjA=w2400',
    youtubeLink: '',
    instagramLink: '',
    telegramLink: '',
    facebookLink: '',
    twitterLink: '',
    whatsappLink: '',
    aparatLink: ''
  })
  await user.save()
}
