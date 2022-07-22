const runs = require("../runs");

// some test common class

/**
 * calculate  r0 x num1
 */
 class OpMul extends runs.Runnable {
    constructor(num1, name) {
        super(name);
        this.num1 = num1;
    }

    run() {
        const self = this;

        setTimeout(function() {
            if(self.r0 == null) {
                self.r0 = 1;
            }

            self.result = self.r0 * self.num1;
            
            self.onResolve(self.result);
        }, 500);
    }
};

/**
 * calculate r0 / num1
 */
class OpDiv extends runs.Runnable {
    constructor(num1, name) {
        super(name);
        this.num1 = num1;
    }

    run() {
        const self = this;
        setTimeout(function() {
            try {
                if(self.r0===null) {
                    self.r0 = 1;
                }

                if(self.num1==0) {
                    throw new Error("div by 0");
                }
                self.result = self.r0 / self.num1;
                self.onResolve(self.result);
            }
            catch(e) {
                self.onReject(e);
            }
        }, 1000);
    }
}


module.exports = {
    OpMul:OpMul,
    OpDiv:OpDiv,
};
