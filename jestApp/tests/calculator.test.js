const mathOperations = require('../index');

describe("Calculator Test Sum", ()=>{
  test("addition of 2 numbers", ()=>{
    let result = mathOperations.sum(2,3)
    expect(result).toBe(5)
  })
  test("addition of 2 numbers with error", ()=>{
    let result = mathOperations.sum(2,3)
    expect(result).toBe(8)
  })
});


// describe("Calculator Test Diff", ()=>{

// });