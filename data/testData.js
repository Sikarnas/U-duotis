const testData = [
  {
    date: "2018-01-05",
    user_id: 1,
    user_type: "natural",
    type: "cash_in",
    operation: { amount: 200.0, currency: "EUR" }
  },
  {
    date: "2018-01-05",
    user_id: 1,
    user_type: "natural",
    type: "cash_in",
    operation: { amount: 2000000.0, currency: "EUR" }
  },
  {
    date: "2018-01-05",
    user_id: 1,
    user_type: "juridical",
    type: "cash_out",
    operation: { amount: 350.0, currency: "EUR" }
  },
  {
    date: "2018-01-05",
    user_id: 1,
    user_type: "juridical",
    type: "cash_out",
    operation: { amount: 20.0, currency: "EUR" }
  },
  [
    {
      date: "2018-01-05",
      user_id: 1,
      user_type: "normal",
      type: "cash_out",
      operation: { amount: 900.0, currency: "EUR" }
    },
    {
      date: "2018-01-06",
      user_id: 1,
      user_type: "normal",
      type: "cash_out",
      operation: { amount: 200.0, currency: "EUR" }
    },
    {
      date: "2018-01-13",
      user_id: 1,
      user_type: "normal",
      type: "cash_out",
      operation: { amount: 30000.0, currency: "EUR" }
    }
  ],
  [
    {
      date: "2018-01-05",
      user_id: 1,
      user_type: "normal",
      type: "cash_out",
      operation: { amount: 1100.0, currency: "EUR" }
    },
    {
      date: "2018-01-06",
      user_id: 1,
      user_type: "normal",
      type: "cash_in",
      operation: { amount: 350.0, currency: "EUR" }
    },
    {
      date: "2018-01-07",
      user_id: 1,
      user_type: "normal",
      type: "cash_out",
      operation: { amount: 30000.0, currency: "EUR" }
    },
    {
      date: "2018-01-13",
      user_id: 1,
      user_type: "normal",
      type: "cash_out",
      operation: { amount: 30000.0, currency: "EUR" }
    },
    {
      date: "2018-01-13",
      user_id: 1,
      user_type: "normal",
      type: "cash_out",
      operation: { amount: 30000.0, currency: "EUR" }
    }
  ],
  {
    date: "2018-01-05",
    user_id: 1,
    user_type: "natural",
    type: "cash_in",
    operation: { amount: 76, currency: "EUR" }
  }
];

module.exports = testData
