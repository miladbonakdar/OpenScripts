export const name = {
  type: String,
  required: true,
  maxlength: 100,
  unique: true,
  set: (n: string) =>
    n
      .trim()
      .split(' ')
      .join('-')
      .toLowerCase()
}
