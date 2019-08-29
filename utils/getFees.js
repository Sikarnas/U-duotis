const fetch = require("node-fetch");

const getCashInFees = async () => {
  const url = "http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in";
  const res = await fetch(url);
  const json = await res.json();
  return {
    cashInCommission: json.percents / 100,
    maxCashInFee: json.max.amount
  };
};

const getCashOutFeesNatural = async () => {
  const url =
    "http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural";
  const res = await fetch(url);
  const json = await res.json();
  return {
    naturalCommissions: json.percents / 100,
    weeklyLimit: json.week_limit.amount
  };
};

const getCashOutFeesLegal = async () => {
  const url =
    "http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical";
  const res = await fetch(url);
  const json = await res.json();
  return {
    legalCommissions: json.percents / 100,
    minLegalCashOutFee: json.min.amount
  };
};

const getFees = async () => {
  const cashIn = await getCashInFees();
  const natural = await getCashOutFeesNatural();
  const legal = await getCashOutFeesLegal();
  return { ...cashIn, ...natural, ...legal };
};

module.exports = getFees;
