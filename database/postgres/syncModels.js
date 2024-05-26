import { Contacts } from "./models/contacts.model.js"
import { Sessions } from "./models/sessions.model.js"
import { Users } from "./models/users.model.js"

export const syncModels = async () => {
  await Users.sync()
  await Contacts.sync()
  await Sessions.sync()
}
