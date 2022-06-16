import { appSchema } from '@nozbe/watermelondb'
import { eventSchema } from './eventSchema'

export default appSchema({
  version: 2,
  tables: [
    eventSchema
  ]
})