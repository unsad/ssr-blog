/**
 * Created by unsad on 2017/11/20.
 */
const log = require('../../utils/log')
const options = require('../../conf/option')
const models = require('../../model/mongo')

module.exports = class {
  constructor() {
  }

  async beforeServerStart() {
    for (const option of options) {
      let key = option.key
      let count = await models.option.find({key}).count().exec()
      if (count === 0) {
        await models.option.create(option)
        log.info(`Option ${key} created`)
      }
    }
  }
}