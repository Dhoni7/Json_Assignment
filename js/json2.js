// expose
module.exports = function (obj)
{
  // to check the given obj is not an number
  if(typeof obj !== 'number')
  {
    throw new Error('Not a number');
  }
  else{
  //   const log4js = require('log4js');
  //  const logger = log4js.getLogger();
   const fs = require('fs');
   const rl = require('readline');
   // creating an interface to read file
const rd = rl.createInterface({
    input: fs.createReadStream('../inputdata/Indicators.csv'),
    output: process.stdout,
    terminal: false
});

let arr2 = [];
// line event called and split the data
rd.on('line', function(data) {
    let linearr = data.split(',');
      if(linearr[1] === 'IND' && linearr[3] === 'SP.URB.GROW')
    {
    arr2.push({' year ': linearr[4], 'Urban population growth (annual %)': linearr[5]});
    }
});
// close event called
rd.on('close', function() {
//   logger.debug(arr2.length);
      fs.writeFile('../outputdata/outputJsonS2.json', JSON.stringify(arr2));
  //  logger.debug('Done');
});
}
};
