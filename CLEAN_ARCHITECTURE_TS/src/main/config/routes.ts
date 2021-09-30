import { Express } from 'express'
import { readdirSync } from 'fs'
export const setupRoutes = (app: Express): void => {
  readdirSync(`${__dirname}/../routes`)
}
