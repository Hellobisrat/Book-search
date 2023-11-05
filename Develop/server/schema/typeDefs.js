const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    bookCount: String
    savedBooks: [Book]!
  }
 

  type Book {
    bookId: ID
    authors: [string]
    description: String
    title: String
    image: String
    link: String
  }
  

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    books(authors: String): [author]
    book(bookId: ID!): Book
    me: User
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(author: [String]!,description: String!, title:String!,image:String!,link:String!): User
    removeBook(bookId: ID!): User
   
  }
`;

module.exports = typeDefs;
