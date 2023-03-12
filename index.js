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
        
        const metaData = JSON.parse(data)

        return res.json({
            total : metaData.users.length,
            users : metaData.users
        })

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
        
        return res.json({
           updated : true,
           data : payload
        })
    });
})

app.listen(port, () => {
    console.log(`listening on port - ${port}`)
})
