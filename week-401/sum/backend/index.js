const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")

app.use(cors())

app.get('/sum', (req, res) => {
  const num1 = req.query.num1;
  const num2 = req.query.num2;
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send("Invalid numbers")
  } else {
    const sum = parseInt(num1) + parseInt(num2);
    res.json({ sum })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
