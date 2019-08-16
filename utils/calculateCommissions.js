const moment = require('moment')

// function gets weeks number

const getWeek = (date) => (moment(date,"YYYY-MM-DD").isoWeek())

// function rounds numbers to required precision

const roundNumbers = (fee) => {
    return Math.ceil(fee * 100) / 100
}

// destructures 3rd argument's object or use default declared values

const calculateCommissions = (operations, callback, 
    {weeklyLimit, cashInCommission, naturalCommissions, legalCommissions, maxCashInFee, minLegalCashOutFee} = 
    {
    weeklyLimit: 1000, 
    cashInCommission: 0.0003, 
    naturalCommissions: 0.003, 
    legalCommissions: 0.003, 
    maxCashInFee: 5, 
    minLegalCashOutFee: 0.5
}) => {

    // check for each type of payment and call PrintFee function with according fee

    operations.forEach(element =>  {

        // check if the type of operation is cash_in and print the fee depending on the fee amount

        if(element.type === 'cash_in') {
            const fee = element.operation.amount*cashInCommission
            fee <= maxCashInFee ?  callback(roundNumbers(fee)) : callback(roundNumbers(maxCashInFee))  
        // check if the type of operation cash_out and user type is juridical and print the fee accordingly
        
    } else if(element.type === 'cash_out' && element.user_type === "juridical") {
            const fee = element.operation.amount*legalCommissions
            fee >= minLegalCashOutFee ? callback(roundNumbers(fee)) : callback(roundNumbers(minLegalCashOutFee))
        } else if(element.type === 'cash_out' && element.user_type === "natural") {
            
            // check if the type is cash_out and the user_type is natural 
            
            const result = operations.filter((operation) => {
            
            //  filter out passed in operations to return operations which are made by the same user and created the same week 

                if(operation.type === 'cash_out' && operation.user_type === "natural" && operation.user_id === element.user_id && getWeek(operation.date) === getWeek(element.date) && operation.date <= element.date) {
                    return true
                } else return false
            })

            let sum = 0

            // calculate the sum of the operations that happened on the same week

            result.forEach((operation) => {
                sum = sum + operation.operation.amount 
            })

            let fee = 0

            // calculate a fee accordingly if the operation is within the 1000 eur weekly limit or not

            if(sum - element.operation.amount > weeklyLimit) {
                fee = element.operation.amount*naturalCommissions
            } else if( sum - weeklyLimit > 0 ) {
                fee = (sum - weeklyLimit) * naturalCommissions
            } else {
                fee = 0
            }

            callback(roundNumbers(fee))
        }
    });
}

module.exports = calculateCommissions