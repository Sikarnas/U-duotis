const moment = require("moment");

// function gets weeks number with provided date

const getWeek = date => moment(date, "YYYY-MM-DD").isoWeek();

// function rounds numbers to required precision

const roundNumbers = fee => {
  return Math.ceil(fee * 100) / 100;
};

const calculateCommissions = async (
  operations,
  {
    weeklyLimit,
    cashInCommission,
    naturalCommissions,
    legalCommissions,
    maxCashInFee,
    minLegalCashOutFee
  },
  callback
) => {
  operations.forEach(element => {

    // check if the type of operation is cash_in and calls calback function with correct fee

    if (element.type === "cash_in") {
      const fee = element.operation.amount * cashInCommission;
      fee <= maxCashInFee
        ? callback(roundNumbers(fee))
        : callback(roundNumbers(maxCashInFee));
    } 

    // check if the type of operation cash_out and user type is juridical and calls calback function with correct fee
    
    if (
      element.type === "cash_out" &&
      element.user_type === "juridical"
    ) {
      const fee = element.operation.amount * legalCommissions;
      fee >= minLegalCashOutFee
        ? callback(roundNumbers(fee))
        : callback(roundNumbers(minLegalCashOutFee));
    }

    // check if the type of operation cash_out and user type is natural and call calback function with correct fee
    
    if (element.type === "cash_out" && element.user_type === "natural") {

    //  filter out passed in operations to return operations which are made by the same user and created in the same week

      const filteredOperations = operations.filter(
        operation =>
          operation.type === "cash_out" &&
          operation.user_type === "natural" &&
          operation.user_id === element.user_id &&
          getWeek(operation.date) === getWeek(element.date) &&
          operation.date <= element.date
      );

      // calculate the sum of the operations that happened on the same week

      let sum = 0;

      filteredOperations.forEach(operation => {
        sum = sum + operation.operation.amount;
      });

      let fee = 0;

      // calculate a fee accordingly if the operation is within the 1000 eur weekly limit or not

      if (sum - element.operation.amount > weeklyLimit) {
        fee = element.operation.amount * naturalCommissions;
      } else if (sum - weeklyLimit > 0) {
        fee = (sum - weeklyLimit) * naturalCommissions;
      } else {
        fee = 0;
      }

      callback(roundNumbers(fee));
    }
  });
};

module.exports = calculateCommissions;
