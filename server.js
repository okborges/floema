const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('template', {
    meta: {
      data: {
        title: 'Floema',
        description: 'Pug is a template engine for Node.js and for the browser.'
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
