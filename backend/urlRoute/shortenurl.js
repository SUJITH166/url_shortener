const express=require('express');
const {nanoid}=require('nanoid');
const router=express.Router();
const pool=require('../db/db')
router.post('/shorten',async (req,res)=>{
    const {url}=req.body;
    // console.log("url recived",url);

    const shortId=nanoid(7);
    try{
        await pool.query(
            "INSERT INTO urls(short_id,long_url) VALUES ($1,$2)",[shortId,url]
        );
        res.json({shortId})
    }
    catch(error){
        console.error("DB Error :",error);
        res.status(500).json({error :"Database error"})
    }
});

router.get('/all',async (req,res)=>{
    try{
        const result =await pool.query("SELECT * FROM urls ORDER BY id DESC");
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Database Error"})
    }
});
module.exports = router;