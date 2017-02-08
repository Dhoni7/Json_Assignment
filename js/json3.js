// expose
module.exports = function (obj)
{
  // to check the given obj is not an number
  if(typeof obj !== 'number')
  {
    throw new Error('Not a number');
  }
  else{
   const fs = require('fs');
   const rl = require('readline');
   // creating an interface to read file
const rd = rl.createInterface({
    input: fs.createReadStream('../inputdata/Indicators.csv'),
    output: process.stdout,
    terminal: false
});
 let arr3 = [];
let ruralArr = [0, 0, 0, 0, 0];
let urbanArr = [0, 0, 0, 0, 0];
let country = ['India', 'China', 'Bhutan', 'Sri Lanka', 'Bangladesh'];
// line event called and split the data
rd.on('line', function(data) {
    let linearr = data.split(',');
  if(linearr[1] === 'IND' && linearr[3] === 'SP.RUR.TOTL')
  {
       ruralArr[0] = ruralArr[0] + parseInt(linearr[5], 10);
     }
    if(linearr[1] === 'IND' && linearr[3] === 'SP.URB.TOTL')
    {
        urbanArr[0] = urbanArr[0] + parseInt(linearr[5], 10);
    }
    if(linearr[1] === 'CHN' && linearr[3] === 'SP.RUR.TOTL')
    {
        ruralArr[1] = ruralArr[1] + parseInt(linearr[5], 10);
    }
    if(linearr[1] === 'CHN' && linearr[3] === 'SP.URB.TOTL')
    {
        urbanArr[1] = urbanArr[1] + parseInt(linearr[5], 10);
    }
    if(linearr[1] === 'PAK' && linearr[3] === 'SP.RUR.TOTL')
    {
        ruralArr[2] = ruralArr[2] + parseInt(linearr[5], 10);
    }
    if(linearr[1] === 'PAK' && linearr[3] === 'SP.URB.TOTL')
    {
        urbanArr[2] = urbanArr[2] + parseInt(linearr[5], 10);
    }
    if(linearr[1] === 'LKA' && linearr[3] === 'SP.RUR.TOTL')
    {
        ruralArr[3] = ruralArr[3] + parseInt(linearr[5], 10);
    }
    if(linearr[1] === 'LKA' && linearr[3] === 'SP.URB.TOTL')
    {
        urbanArr[3] = urbanArr[3] + parseInt(linearr[5], 10);
    }
    if(linearr[1] === 'BGD' && linearr[3] === 'SP.RUR.TOTL')
    {
        ruralArr[4] = ruralArr[4] + parseInt(linearr[5], 10);
    }
    if(linearr[1] === 'BGD' && linearr[3] === 'SP.URB.TOTL')
    {
        urbanArr[4] = urbanArr[4] + parseInt(linearr[5], 10);
    }
});
// close event called
rd.on('close', function() {
  for(let i = 0; i < country.length; i = i + 1)
  {
      arr3.push({Country: country[i], Urban: urbanArr[i], Rural: ruralArr[i]});
  }
  for (let i = 0; i < arr3.length; i = i + 1)
  {
      for (let j = 0; j < arr3.length - 1; j = j + 1)
      {
          if(arr3[j].Total_Population < arr3[j + 1].Total_Population)
          {
             let temp = arr3[j];
             arr3[j] = arr3[j + 1];
             arr3[j + 1] = temp;
          }
      }
  }
  fs.writeFile('../outputdata/outputJsonS3', JSON.stringify(arr3));
});
}
};
