const express = require('express')
const router = express.Router()
const job = require('../models/job')

//createjob
router.post('/createjob', async(req,res)=>{
    try {
        const {avatar, email,profile , skills, location , active , resume}=req.body
        const newjob = new job({avatar:avatar , email:email ,profile:profile , skills:skills , location:location , active:active})
        const savejob = await newjob.save()
        if(savejob){
            return res.json({message:'job created'})
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/getjob' , async(req,res)=>{
    try {
        const {profile,active , location} = req.query
        // console.log(profile, skills, location);
        const  obj = {}
        if(profile){
            obj.profile={$regex:profile , $options:'i'}
        }
        if(location){
              obj.location={$elemMatch:{'location':{$regex:location , $options:'i'}}}
        }
        if(active){
            obj.active=active
        }
        console.log(obj);
        const total = await job.find(obj).count(obj)
        const getjob = await job.find(obj)
        if(getjob.length===0){
            return res.json({success:false , message:'Perform a valid seasrch' , error:true})
        }
        else{
            return res.json({success:true , result:getjob ,total:total})
        }
       
    
    } catch (error) {
        return res.json({success:false , message:'Perform a valid seasrch' , error:true})
    }
})
router.get('/getdetail/:id' , async(req,res)=>{
    try {
        const {id}=req.params
        const getdata = await job.find({_id:id})
        if(getdata){
            return res.json({Success:true , message:getdata})
        }
    } catch (error) {
        return res.json({error:true , message:'Provide a valid id'}) 
       }
})
router.delete('/delete/:id'  ,async(req,res)=>{
    try {
        const {id}=req.params
        const deletedata = await job.deleteOne({_id:id})
        if(deletedata){
            return res.json({message:`data deleted with id:${id}`})
        }
    } catch (error) {
        console.log(error);
    }
})
router.patch('/update/:id', async(req,res)=>{
    try {
        const{id}=req.params
        const updatedata = await job.updateOne({skills:{$elemMatch:{_id:id}}} , {$set:{'skills.$.skill':'reactjs'}})
        if(updatedata){
            return res.json(updatedata)
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports=router