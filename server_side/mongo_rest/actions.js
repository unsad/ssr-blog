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
        ['limit', 'skip', 'sort', 'count'].forEach(function(key) {
          if (query[key]) {
            let arg = query[key];
            if (key === 'limit' || key === 'skip') {
              arg = parseInt(arg);
            }
            if (key !== 'count') {
              builder[key](arg);
            } else {
              builder[key]();
            }
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
    },
    deleteById: async function(next) {
      await next;
      let error, result;
      try {
        result = await model.findByIdAndRemove(this.params.id).exec();
        return this.body = result;
      } catch (_error) {
        error = _error;
        return this.body = error;
      }
    },
    replaceById: async function(next) {
      await next;
      let error, newDocument, result;
      try {
        await model.findByIdAndRemove(this.params.id).exec();
        newDocument = this.request.body;
        newDocument._id = this.params.id;
        result = await model.create(newDocument);
        return this.body = result;
      } catch (_error) {
        return this.body = error;
      }
    },
    updateById: async function(next) {
      await next;
      let error, result;
      try {
        result = await model.findByIdAndUpdate(this.params.id, this.request.body, {new: true}).exec();
        return this.body = result;
      } catch (_error) {
        error = _error;
        return this.body = error;
      }
    },
    create: async function(next) {
      await next;
      let error, result;
      try {
        result = await model.create(this.request.body);
        this.status = 201;
        return this.body = result;
      } catch (_error) {
        error = _error;
        return this.body = error;
      }
    }
  }
};