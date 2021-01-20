const usersResolver = require('./users.tsx');
const recordsResolver = require('./records.tsx')

const rootResolver= {
    ...usersResolver,
    ...recordsResolver
}
module.exports = rootResolver;