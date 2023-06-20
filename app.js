import express from 'express';
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import { graphqlHTTP } from "express-graphql";
import resolvers from "./resolvers.js";

const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/404', (req, res) => {
    res.render('404');
});

const typeDefs = importSchema("./schema.graphql");
const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers,
    });

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
    })
    );

app.listen(port, () => {
    console.log(`API graphql is listening on port ${port}`)
})