const express = require('express');
const path = require('path');

const server = express();

server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
  res.send();
});

server.listen(3000, () => {
  console.log('Started listening on port', 3000);
});
