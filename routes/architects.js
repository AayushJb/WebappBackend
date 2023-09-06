
const fetch =require('node-fetch')
const express = require("express");
const cron = require("node-cron");

const router = express.Router();

const client_id = "5c8f5ac731b4bc9285588af2969768a738e4a75312249959b368081322069da8"
const client_secret = "851537eb57502d1820aa8a0f141d75728594cc163e896c10eb0e68503988fe2e"
var access_key;




var Vendor = require('../models/architect');



cron.schedule("*/5 * * * * *", function() {
  
   console.log("here") 
    
/*
        getAccessToken() 
        .then((response)=>{
          return GetCompanyVendors(response)
          
         })
         .then((response)=>{
      
          let CompanyNamesNId = []
      
          for(var i = 0; i<response.length;i++)
          {
            var temp = { ArchitectName : response[i].company, ArchitectID : response[i].id}
            CompanyNamesNId.push(temp)
      
          }
      
         
          return CompanyNamesNId
 
      
         })
         .then((response)=>{

             Vendor.find()
            .then(documents=>{

                
              var  NewArchitect  = []
               
              response.map(item =>{
 
                documents.map(Monitem =>{

                    if(Monitem.ArchitectName!==item.ArchitectName)
                    {
                       NewArchitect.push(item)
                    }

                })
             
            
               
              })
 
              return NewArchitect

            })
            .then((response)=>{
                if(response.length>0)
                {
                    Vendor.insertMany(response).then((response)=>{
                        console.log(response)
                    })
                }
            }) 

         })
         


/*
         
    vendor.save().then(createdVendor =>{
        res.status(201).json({
            message: "Vendors.",
            vendorId: createdVendor._id
        });
        const text = "Saved Successfully"
        return  text;
    });
     
 */

});



async function getAccessToken() {

    const grant_type = 'client_credentials';
    const redirect_uri = 'http://3.109.31.86/projects';
    const refresh_token = 'string'
  
  
    const res = await fetch('https://login.procore.com/oauth/token', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        grant_type,
        client_id,
        client_secret,
        refresh_token
  
      })
  
    })
  
  const data = await res.json();
  const params = new URLSearchParams(data)
  
  return Promise.resolve(params.get("access_token"))
  
  }

async function GetCompanyVendors(access_token)
  {
   
    
    const res = await fetch('https://api.procore.com/rest/v1.0/vendors?company_id=562949953442334', {
      method: 'GET',
      headers: {
      Authorization: `Bearer ${access_token}`,
      'content-type': 'application/json',
      'Procore-Company-Id': 562949953442334
       }
     
    })
  
  const data = await res.json();
  
  return data
  
  
}
    

module.exports = cron;