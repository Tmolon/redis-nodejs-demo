const redis = require('redis')
const client = redis.createClient()

client.on("error", error => {
    console.log(error);
});

//Key value ekleme
client.set("name","Tolga", (err,msg)=>{
    if(err){
        console.log(err)
    }
    console.log(msg)
})

client.get("name", (err,msg)=>{
    if(err){
        console.log(err)
    }
    console.log(msg)
})





