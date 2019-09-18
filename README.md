# Data Pulse
Accumulates data inputs and writes them at the configured interval  
using a write function.

It also has a counter function that writes a given log statement  
at the configured number of repetitions.

## Whats the Use?
If data writes are expensive computationally this allows a larger  
number to happen at once. 
Could be useful for db/disk writes to reduce IO frequency even though  
the total size of the data will not change.

## installation 
npm install @jadesrochers/datapulse

const acc = require('@jadesrochers/datapulse')

## Data Accumulator/Writer Usage
This example uses a write function that just writes all the data  
to a file with naming based on the first element.

#### sample write function
This is just a simple file write, but you can build a function  
to do anything with the passed storage array that you want.
```javascript
let writefcn3 = storedArray => require('fs').writeFile(
    'testfile' + storedArray[0] + '.txt',
    JSON.stringify(storedArray,null,1),
    (out) => {}
); 
```
#### create the accumulator
Then create the accumulator, passing the interval and writing function.
var testWrite = acc.storeAndWrite(100, inFcn)

#### run it through a simple test
This should write 10 file, each named with the first number in the array.
```javascript
async function waiter(){
  for(let j = 1; j < 1001; j++){
    await testWrite.add(j) 
  }
}
```

### Currently have to await the write function
The await is needed for when the write function fires.  
The write function is passed the internal storage, so currently you need  
to wait for the write to finish to add/clear this internal storage.  
I might change this to clone and then reset and not wait in the future.

## Counter usage
Very simple; pass the threshold to activate a statement, and the statement.  
Accepts custom log function as optional third argument.

let testcount = acc.counter(1000, 'Test entries counted')
```javascript
for(let j = 1; j < 10001; j++){
  testcount()
}
```
