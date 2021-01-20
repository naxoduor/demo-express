const { buildSchema } = require('graphql');
module.exports = buildSchema(`
type Query {
  post(id:Int!): Post
  posts:[Post]
}

type Post {
  id:Int
  title:String
  comments:[Comment]
}

type Comment {
  text:String
  user:String
}

input RegisterInput {
  firstName:String!
  lastName:String!
  email: String!
  password: String!
}

input LoginInput {
  email:String!
  password:String!
}

input RecordsInput {
  title:String
  description:String
  userId:Int
}

type RecordsReturned {
  title:String!
  description:String!
  userId:Int!
}

type User {
  firstName:String
  lastName:String
  email:String
  password:String
}

type AuthData {
  userId:ID!
  token:String!
  tokenExpiration:Int!
}

type RootMutation {
  createUser(registerInput:RegisterInput):String
  login(loginInput:LoginInput):AuthData
  createRecord(recordsInput:RecordsInput):[RecordsReturned]

}
schema {
    query: Query
    mutation:RootMutation
}
`);


