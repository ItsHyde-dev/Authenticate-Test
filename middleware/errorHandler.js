export const errorHandler = (err, req, res, next) => {
  if (!err.code) {
    // send internal server error as to not expose the error
    console.log("Err: ", err)
    res.status(500).json({ message: "Internal Server Error" })
  }

  return res.status(err.code).json({ message: err.message });
}


