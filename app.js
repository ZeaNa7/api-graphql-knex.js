import express from 'express';
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import { graphqlHTTP } from "express-graphql";
import resolvers from "./resolvers/resolvers.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';

const app = express()
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views', join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

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