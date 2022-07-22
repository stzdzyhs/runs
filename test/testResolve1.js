
const assert = require("assert");
const runs = require("../runs");
const testComm = require("./testComm");

// test resolve

function testPromise1() {
    console.log("ttttt");

    let runnables = [ 
        new testComm.OpMul(2, "mul-2"),  
        new testComm.OpMul(3, "mul-3"),
        new testComm.OpDiv(5, "div-5"),
    ];

    let executor = new runs.SeriesExeccutor(runnables);

    executor.run(
        (result)=>{
            assert.deepEqual([2, 6, 1.2], executor.results);
            console.log("testPromise1 OK");
        },

        (err, idx)=> {
            throw new Error(err);
        }
    );

};

testPromise1();
