/**
 * checkCashRegister -
 *
 * @param  {type} price description
 * @param  {type} cash  description
 * @param  {type} cid   description
 * @return {type}       description
 */
function checkCashRegister(price, cash, cid) {
  let change_arr = [];
  let change = cash - price;

  const currency_unit = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ];

  let closed = true;

  let i = currency_unit.length - 1;
  while (change > 0 && i >= 0) {
    // console.log('change:', change);

    const cu_key = currency_unit[i][0];
    const cu_value = currency_unit[i][1];

    if (cu_value <= change) {
      const num = Math.floor(change / cu_value);

      // console.log('num:' + num);
      // console.log('cu_value:' + cu_value);

      let to_subtract;

      if (num <= cid[i][1] / cu_value) to_subtract = num * cu_value;
      else to_subtract = cid[i][1];

      // console.log('to_subtract:', to_subtract);

      change = parseFloat((change - to_subtract).toFixed(2));
      cid[i][1] = parseFloat((cid[i][1] - to_subtract).toFixed(2));
      change_arr.push([cu_key, to_subtract]);

      if (cid[i][1] > 0) closed = false;
    }

    i--;
  }

  let status;

  // console.log('change:' + change);

  if (change > 0) {
    status = 'INSUFFICIENT_FUNDS';
    change_arr = [];

  }  else if (closed) {
     status = 'CLOSED';

     for(let i = change_arr.length; i < currency_unit.length; i++) {
       change_arr.unshift(cid[i]);
     }

     change_arr.reverse();
  }
  else status = 'OPEN';

  // console.log('change_arr:', change_arr);

  // Here is your change, ma'am.
  return {
    status,
    change: change_arr
  };
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]);

module.exports = checkCashRegister;
