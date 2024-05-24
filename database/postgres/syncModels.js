import { Contacts } from "./models/contacts.model.js"
import { Sessions } from "./models/sessions.model.js"
import { Users } from "./models/users.model.js"

export const syncModels = () => {
  Users.sync()
  Contacts.sync()
  Sessions.sync()
}
