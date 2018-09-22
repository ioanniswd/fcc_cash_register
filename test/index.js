"use strict";

const expect = require('chai').expect;
const index = require('../index');

it('open', function() {
  const price = 19.5;
  const cash = 20;
  const cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ];

  expect(index(price, cash, cid)).to.deep.equal({
    status: "OPEN",
    change: [
      ["QUARTER", 0.5]
    ]
  });
});


it('open2', function() {
  const price = 3.26;
  const cash = 100;
  const cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ];

  expect(index(price, cash, cid)).to.deep.equal({
    status: "OPEN",
    change: [
      ["TWENTY", 60],
      ["TEN", 20],
      ["FIVE", 15],
      ["ONE", 1],
      ["QUARTER", 0.5],
      ["DIME", 0.2],
      ["PENNY", 0.04]
    ]
  });
});

it('insuff', function() {
  const price = 19.5;
  const cash = 20;
  const cid = [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ];

  expect(index(price, cash, cid)).to.deep.equal({
    status: "INSUFFICIENT_FUNDS",
    change: []
  });
});

it('insuff2', function() {
  const price = 19.5;
  const cash = 20;
  const cid = [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ];

  expect(index(price, cash, cid)).to.deep.equal({
    status: "INSUFFICIENT_FUNDS",
    change: []
  });
});

it('closed', function() {
  const price = 19.5;
  const cash = 20;
  const cid = [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ];

  expect(index(price, cash, cid)).to.deep.equal({
    status: "CLOSED",
    change: [
      ["PENNY", 0.5],
      ["NICKEL", 0],
      ["DIME", 0],
      ["QUARTER", 0],
      ["ONE", 0],
      ["FIVE", 0],
      ["TEN", 0],
      ["TWENTY", 0],
      ["ONE HUNDRED", 0]
    ]
  });
});
