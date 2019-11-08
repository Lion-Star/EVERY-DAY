let express = require("express")

let app = express()

let read = require("./middleware/read")

const path = require("path")

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(process.cwd()))

app.use(read)

module.exports = app