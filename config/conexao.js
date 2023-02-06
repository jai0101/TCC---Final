const mongoose = require('mongoose')
const uri = "mongodb://localhost:27017/apnp"

mongoose.connect(uri);

//mongoose.connect(uri, { useNewUrlParse: true, useUnifiedTopology: true })

module.exports = mongoose