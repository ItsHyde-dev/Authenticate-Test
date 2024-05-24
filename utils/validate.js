export default function validate(schema, obj) {
  const { error } = schema.validate(obj);
  if (error) throw BadRequestError(error.message);
}
