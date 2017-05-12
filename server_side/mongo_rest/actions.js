/**
 * Created by unsad on 2017/5/10.
 */
module.exports = function generateActions(model) {
  return {
    findAll: async function(next) {
      await next;
      let error, result;
      try {
        let conditions = {};
        let query = this.request.query;
        if (query.conditions) {
          conditions = JSON.parse(query.conditions);
        }
        let builder = model.find(conditions);
        ['limit', 'skip', 'sort'].forEach(function(key) {
          if (query[key]) {
            builder[key](query[key]);
          }
        });
        result = await builder.exec();
        return this.body = result;
      } catch (_error) {
        error = _error;
        return this.body = error;
      }
    },
    findById: async function(next) {
      await next;
      let error, result;
      try {
        result = await model.findById(this.params.id).exec();
        return this.body = result;
      } catch (_error) {
        error = _error;
        return this.body = error;
      }
    }
  }
};