const express =require('express');
const cors=require('cors')
const {nanoid}=require('nanoid')
const app=express();

const shortenurl=require('./urlRoute/shortenurl')
app.use(cors());
app.use(express.json());

app.use('/',shortenurl)


app.listen(5000, () => {
    console.log("Server running on port 5000");
});