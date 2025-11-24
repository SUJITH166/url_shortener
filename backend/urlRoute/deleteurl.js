const express=require('express');
const deleteurls=express.Router();
const pool=require('../db/db');

deleteurls.delete('/:id',async(req,res)=>{
    const {id}=req.params;

   try{ const response=await pool.query("DELETE FROM urls WHERE id=$1",
        [id]
    );

    if(response.rowCount===0)
    {
        return res.status(404).json({message:"URL not found"})
    }
    res.json({message:"URL deleted successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Server error"})
    }
});

module.exports=deleteurls;