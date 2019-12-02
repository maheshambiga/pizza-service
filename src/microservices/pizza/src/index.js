import express from "express";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import schema from "./graphql/schema";
import config from "./graphql/utils/config";

const app = express();

// body parser
app.use(bodyParser.json());

// connect to mongodb
mongoose.connect(config.databaseURL, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("connected");
});

// bind express with graphql
app.use(
  "/api/pizza",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(process.env.PORT, () => {
  console.log(`now listening for requests on port ${process.env.PORT}`);
});

process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log(
      "Mongoose default connection is disconnected due to application termination"
    );
    process.exit(0);
  });
});
