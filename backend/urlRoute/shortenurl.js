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

router.get('/:shortId',async(req,res)=>{
    const {shortId}=req.params;
    try{
        const result=await pool.query("SELECT long_url FROM urls WHERE short_id=$1",
            [shortId]);
        if(result.rows.length===0)
        {
            return res.status(404).send("URL Not Found");
        }
        const longurl=result.rows[0].long_url;
        return res.redirect(longurl);
    }catch(error){
        console.error(error)
        res.status(500).send("server error")
    }
});
module.exports = router;