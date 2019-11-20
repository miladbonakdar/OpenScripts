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
    firstName: 'میلاد',
    lastName: 'بنکدار',
    telegramId: 0,
    email: ADMIN_EMAIL,
    password: await hashPassword(ADMIN_PASS),
    info:
      'با افتخار گیکی هستم که علاقه ی زیادی به برنامه نویسی، آموزش و نجوم  دارم و همیشه در حال یادگیری چیزای جدید',
    photoUrl:
      'https://lh3.googleusercontent.com/Bm7HycKvgiH8Pw8-DqCR8Z9LkdbvDgydVPVuGctC82ar-fI_as3NfHOvkhC9qdKIXiH4MZ9S4XNh1-hwgsAVim__wS4qKl1tMYVwCxFxTUBgePD6YQ5muHNeQQWYrv_I_eXcwX7xAw=w2400',
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
