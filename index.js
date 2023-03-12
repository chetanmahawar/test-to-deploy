const express = require("express");
const port = 9000;
const users = require("./users.json")
const fs = require("fs")

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
    return res.json({
        message: "welcome to testing"
    })
})

app.get("/users", (req, res) => {

    fs.readFile("./users.json", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        return res.json(JSON.parse(data))

    })
})

app.post("/users", (req, res) => {

    fs.readFile("./users.json", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const jsonData = JSON.parse(data);

        const { name, age, profession } = req.body
        const payload = { name, age, profession }

        jsonData.users.push(payload)

        const updatedData = JSON.stringify(jsonData);


        fs.writeFile('./users.json', updatedData, 'utf8', err => {
            if (err) {
                console.error(err);
                return;
            }
        });
    });
})

app.listen(port, () => {
    console.log(`listening on port - ${port}`)
})
