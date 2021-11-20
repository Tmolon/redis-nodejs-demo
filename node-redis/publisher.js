const redis = require('redis')
const client = redis.createClient()

const fs = require('fs')
fs.readFile('./data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    try {
        const customer = JSON.parse(jsonString)
        for (let i = 0; i < 1300; i++) {
            console.log("Customer address is:", ) 
                client.publish("firstName", customer.employees[i].firstName, (error, message) => {
                    if (error) {
                        console.log(error);
                    }
                    console.log(message);
                })
            
           
          }
        
    } catch (err) {
        console.log('Error parsing JSON string:', err)
    }

})

client.on("error", error => {
    console.log(error);
});






