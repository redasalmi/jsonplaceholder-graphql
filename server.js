const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const { grapqlHttp, graphqlPlayground } = require('./config/graphql');

const app = express();
const PORT = process.env.PORT || 5000;

// express middleware
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// graphql
app.use('/graphql', grapqlHttp);
app.get('/', graphqlPlayground);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
