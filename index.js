const express = require("express");
const port = 9000;

const app = express();

app.get("/", (req, res) => {
    return res.json({
        message : "welcome to testing"
    })
})

app.listen(port , () => {
    console.log(`listening on port - ${port}`)
})