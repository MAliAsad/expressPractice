const express=require("express");
const router=express.Router();
const members=require("../../Members");
const uuid=require("uuid");
const { response } = require("express");


// getting members from json

router.get("/",(req,res)=>{
    res.json(members);
});

// Getting single Member

router.get("/:id",(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id));

    if(found){
        res.json(members.filter((member)=>{
            return member.id===parseInt(req.params.id);
        }));
    }else{
        res.status(400).json({msg:"Member not found"});
    }
});

// Create Member

router.post("/",(req,res)=>{
    const newMember={
        id:uuid.v4(),
        name:req.body.name,
        status:req.body.status
    }
    if(!newMember.name){
        return res.status(400).json({msg:"Please enter a name"});
    }else{
        members.push(newMember);
        // res.json(members);
        res.redirect("/");
    }
});

// update member

router.put("/:id",(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id));

    if(found){
        const updMember=req.body;
        members.forEach((member)=>{
            if(member.id===parseInt(req.params.id)){
                member.name=updMember.name?updMember.name:member.name;
                member.status=updMember.status?updMember.status:member.status;
                res.json({msg:"Member Updated",member});
            }
        });
    }else{
        res.status(400).json({msg:"Member not found"});
    }
});

// Delete member

router.delete("/:id",(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id));

    if(found){
        res.json({msg:"member deleted",members: members.filter((member)=>{
            return member.id!==parseInt(req.params.id);
        })});
    }else{
        res.status(400).json({msg:"Member not found"});
    }
});

module.exports=router;
