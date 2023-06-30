import { expect } from 'chai';
import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import '../app.js';

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

describe('Tests des résolveurs', () => {
  it('devrait renvoyer la valeur "Hello, world!"', async () => {
    const query = `
      query {
        hello
      }
    `;

    const response = await graphql(schema, query);
    expect(response.data.hello).to.equal('Hello, world!');
  });
});
