var acc = require('./index')

test('counter accumulator operation tests', () => {
  var logFn = jest.fn()
  var testcount = acc.counter(1000, 'Test entries counted', logFn)
  for(let j = 1; j < 10001; j++){
    testcount()
  }
  expect(logFn).toHaveBeenCalledTimes(10)
  expect(logFn).toHaveBeenNthCalledWith(3, 3000, 'Test entries counted')
})

test('storeAndWrite accumulator operation tests', async () => {
  var inFcn = jest.fn()
  var testWrite = acc.storeAndWrite(100, inFcn)
  for(let j = 1; j < 1001; j++){
    await testWrite.add(j) 
  }
  expect(inFcn).toHaveBeenCalledTimes(10)
  // Can't test what it was called with because there in only one copy
  // of storage and it ends up blank, which is what jest sees.
  expect(inFcn).toHaveBeenNthCalledWith(1,[])
})

