var express = require("express");

var app = express();
const PORT = process.env.PORT || 5000

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
});