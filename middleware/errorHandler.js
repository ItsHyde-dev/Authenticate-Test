export const errorHandler = (req, res, next) => {
  // return response according to the error
  console.log({ req, res, next })

  return res.sendStatus(500)
}
