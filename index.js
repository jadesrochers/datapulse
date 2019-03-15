const R = require('ramda')

const flushData = R.curry((storage,flushFcn) => async () => {
    debugger;
    if(storage.length === 0){ return; }
    await flushFcn(storage) 
    storage.length = 0
  }
)

const storeData = R.curry((storage,inData) => {
    // COPY! otherwise issues with outside reference.
    let copyData = R.clone(inData);
    storage.push(copyData)
  }
)

const storeAndWrite = R.curry((lengthLimit,inFcn) => {
  var storage = [] 
  var storer = storeData(storage)
  var flusher = flushData(storage,inFcn)
  var dataAdd = async (data) => {
    storer(data); 
    if(storage.length >= lengthLimit){
      await flusher()
    }
  }
  return Object.assign(
    {},
    {add: dataAdd},
    {flush: flusher},
  )
})

const logCount = (n, statement) => {
  console.log('Counted ',n,statement,'\nat ',new Date())
}

// The last argument is only for testing, or custom logging.
const counter = R.curry((max,statement,logFn = logCount) => {
  var n = 0;
  return () => {
    n++;
    if((n % max) === 0){
      logFn(n, statement)
    }
  }
})

exports.storeAndWrite = storeAndWrite
exports.counter = counter
exports.logCount = logCount
