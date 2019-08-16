const fs = require('fs')
const calculateCommissions = require('./utils/calculateCommissions')

const fileName = process.argv[2]
const operations = JSON.parse(fs.readFileSync(fileName))

const parameters = {
    weeklyLimit: 0, 
    cashInCommission: 0.0003, 
    naturalCommissions: 0.003, 
    legalCommissions: 0.003, 
    maxCashInFee: 5, 
    minLegalCashOutFee: 0.5
}

// prints fees to the console, you can pass object as a 3rd parameter with different values or it will use default values

calculateCommissions(operations, (fee) => console.log(fee)/*, parameters*/)
