const calculateCommissions = require('../utils/calculateCommissions')

const test1 = [{ 
    date: "2018-01-05", 
    user_id: 1, 
    user_type: "natural", 
    type: "cash_in", 
    operation: { amount: 200.00, currency: "EUR" } 
}]
   
test('Should return correct fee for cash_in operation',() => {
    calculateCommissions(test1, (fee) => {
        expect(fee).toBe(0.06)
    })
})

const test2 = [{ 
    date: "2018-01-05", 
    user_id: 1, 
    user_type: "natural", 
    type: "cash_in", 
    operation: { amount: 2000000.00, currency: "EUR" } 
}]
   
test('Should calculate correct maxim cash_in fee ',() => {
    calculateCommissions(test2, (fee) => {
        expect(fee).toBe(5)
    })    
})

const test3 = [{ 
    date: "2018-01-05", 
    user_id: 1, 
    user_type: "juridical", 
    type: "cash_out", 
    operation: { amount: 350.00, currency: "EUR" } 
}]

test('Should calculate correct cash_out fee for juridical user',() => {
    calculateCommissions(test3, (fee) => {
        expect(fee).toBe(350*0.003)
    })
})

const test4 = [{ 
    date: "2018-01-05", 
    user_id: 1, 
    user_type: "juridical", 
    type: "cash_out", 
    operation: { amount: 20.00, currency: "EUR" } 
}]

test('Should calculate correct minimum cash_out fee for juridical user ',() => {
    calculateCommissions(test4, (fee) => {
        expect(fee).toBe(0.5)
    })
})

const test5 = [{ 
    date: "2018-01-05", 
    user_id: 1, 
    user_type: "normal", 
    type: "cash_out", 
    operation: { amount: 900.00, currency: "EUR" } 
},{ 
    date: "2018-01-06", 
    user_id: 1, 
    user_type: "normal", 
    type: "cash_out", 
    operation: { amount: 200.00, currency: "EUR" } 
},{ 
    date: "2018-01-13", 
    user_id: 1, 
    user_type: "normal", 
    type: "cash_out", 
    operation: { amount: 30000.00, currency: "EUR" } 
}]

test('Should calculate correct cash_out fee for normal user ',() => {
    calculateCommissions(test5, (fee) => {
        expect(fee).toBe(0 || 100*0.003 || 29000*0.003)
    })
})

const test6 = [{ 
    date: "2018-01-05", 
    user_id: 1, 
    user_type: "normal", 
    type: "cash_out", 
    operation: { amount: 1100.00, currency: "EUR" } 
},{ 
    date: "2018-01-06", 
    user_id: 1, 
    user_type: "normal", 
    type: "cash_in", 
    operation: { amount: 350.00, currency: "EUR" } 
},{ 
    date: "2018-01-07", 
    user_id: 1, 
    user_type: "normal", 
    type: "cash_out", 
    operation: { amount: 30000.00, currency: "EUR" } 
},{ 
    date: "2018-01-13", 
    user_id: 1, 
    user_type: "normal", 
    type: "cash_out", 
    operation: { amount: 30000.00, currency: "EUR" } 
},{ 
    date: "2018-01-13", 
    user_id: 1, 
    user_type: "normal", 
    type: "cash_out", 
    operation: { amount: 30000.00, currency: "EUR" } 
}]

test('Should calculate correct cash_out fee for normal user ',() => {
    calculateCommissions(test6, (fee) => {
        expect(fee).toBe(0.11 || 100*0.003 || 29000*0.003 || 59000*0.003)
    })
})

const test7 = [{ 
    date: "2018-01-05", 
    user_id: 1, 
    user_type: "natural", 
    type: "cash_in", 
    operation: { amount: 76, currency: "EUR" } 
}]
   
test('Should return correct rounded fee',() => {
    calculateCommissions(test7, (fee) => {
        expect(fee).toBe(0.03)
    })
})

0.023