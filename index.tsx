const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { graphql} = require('graphql');
const graphQlSchema = require('./graphql/schema/index.tsx');
const graphQlResolvers = require('./graphql/resolvers/index.tsx');
const bodyParser = require('body-parser')
const isAuth = require('./middleware/auth.tsx')


const app = express();

app.use((req, res, next)=>{
  console.log("set headers")
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  if(req.method==='OPTIONS'){
    return res.sendStatus(200)
  }
  next()
})
app.use(isAuth)

app.use(
  '/graphql',
  graphqlHTTP({
    schema:graphQlSchema,
    rootValue:graphQlResolvers,
    graphiql: true,
  }),
);

app.listen(4000);