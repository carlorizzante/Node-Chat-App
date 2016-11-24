const moment = require("moment");

const date = moment();
console.log(moment().format("h:mm a"));

console.log(new Date().getTime());
console.log(new Date().getTime());
console.log(moment().valueOf());
console.log(moment().valueOf());

const time1 = new Date().getTime();
const time2 = moment().valueOf();
console.log(time1 - time2);
