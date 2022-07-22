const assert = require("assert");
const runs = require("../runs");
const testComm = require("./testComm");

// test reject
testReject1();

function testReject1() {
    let runnables = [ 
        new testComm.OpMul(2, "mul-2"),
        new testComm.OpMul(3, "mul-3"),
        new testComm.OpDiv(0, "div-0"),
        new testComm.OpDiv(5, "div-5"),
    ];

    let executor = new runs.SeriesExeccutor(runnables);
    executor.run(
        (result)=>{
            throw new Error("this should be rejected");
        },

        (err, idx)=> {
            assert.assertTrue(idx===2);
            console.log("testReject1 OK");
        }
    );

};
