const mongoose = require('mongoose');
const express = require('express')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

require("./routes/index")(app);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, function() {
    console.log(`listening on http://localhost:${PORT}`)
});