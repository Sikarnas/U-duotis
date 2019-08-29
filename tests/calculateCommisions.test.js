const calculateCommissions = require("../utils/calculateCommissions");
const testData = require("../data/testData")

test("Should return correct fee for cash_in operation", () => {
  calculateCommissions(testData[0], fee => {
    expect(fee).toBe(0.06);
  });
});

test("Should calculate correct maxim cash_in fee ", () => {
  calculateCommissions(testData[1], fee => {
    expect(fee).toBe(5);
  });
});

test("Should calculate correct cash_out fee for juridical user", () => {
  calculateCommissions(testData[2], fee => {
    expect(fee).toBe(350 * 0.003);
  });
});

test("Should calculate correct minimum cash_out fee for juridical user ", () => {
  calculateCommissions(testData[3], fee => {
    expect(fee).toBe(0.5);
  });
});

test("Should calculate correct cash_out fee for normal user ", () => {
  calculateCommissions(testData[4], fee => {
    expect(fee).toBe([0, 100 * 0.003, 29000 * 0.003]);
  });
});

test("Should calculate correct cash_out fee for normal user ", () => {
  calculateCommissions(testData[5], fee => {
    expect(fee).toBe([0.11, 100 * 0.003, 29000 * 0.003, 59000 * 0.003]);
  });
});

test("Should return correct rounded fee", () => {
  calculateCommissions(testData[6], fee => {
    expect(fee).toBe(0.03);
  });
});
