const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors())

app.get('/si', (req, res) => {

    const p = parseFloat(req.query.p);
    const t = parseFloat(req.query.t);
    const r = parseFloat(req.query.r);

    const si = (p * t * r)/100;

   res.json({si});
  

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})