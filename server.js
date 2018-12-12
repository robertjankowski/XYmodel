var express = require("express");

var app = express();
const PORT = 8001

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile("index.html");
});

app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
});