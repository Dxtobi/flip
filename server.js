const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const trade = require('./routes/api/trade');
//const posts = require('./routes/api/posts');
const blogPost = require('./routes/api/blogPost');
const passport = require('passport');
const path = require('path')
const app = express();
const cors = require('cors');

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//db config
const db = require('./config/keys').mongoURI;

//db connection
mongoose
    .connect(process.env.MONGODB_URI || db, {useNewUrlParser:true, useUnifiedTopology:true })
    .then(() => console.log('MongoDb connected'))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport strategy
require('./config/passport')(passport);
//middleware

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
}
app.use('/api/users', users);
app.use('/api/trade', trade);
app.use('/api/posts', blogPost);

app.use(express.urlencoded({extended:false}))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));

