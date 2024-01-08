const verifyrole=(roles)=>{
    console.log(roles)
    
        return(req,res,next)=>{
            if(roles.includes(req.body.isAdmin)){
               return next()
            }else{
                return res.status(403).send('Forbidden');
            }
        }
       
    }
    
    module.exports={verifyrole}