const express = require('express');
const path = require('path');
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

// public folder
app.use(express.static(path.join(__dirname, 'public')));

// graphql
app.use('/graphql', grapqlHttp);
app.get('/playground', graphqlPlayground);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
