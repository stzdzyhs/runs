
/**
 * runnable base class, override run() in sub classes.
 */
 class Runnable {
    static i = 0;

    /**
     * create a Runnable
     * @param {string} name - a name for this Runnable, e.g: use for debug
     */
    constructor(name) {
        if(name==null || name=="") {
            name = "Runnable" + i;
            i++;
        }
        this.name = name;

        // explicity init some fields
        this.r0 = null; // the previous runnable result
        this.result = null; // the current runnable result

        this.onResolve = null;
        this.onReject = null;
    }

    /**
     * get name
     * @returns name
     */
    getName() {
        return this.name;
    }

    /**
     * set the previous result used in this Runnable
     * @param {object} r0 
     */
    setR0(r0) {
        this.r0 = r0;
    }

    /**
     * set callback of this runnable
     * @param {callback} resolve cb
     * @param {callback} reject cb
     */
    setCallback(resolve, reject) {
        this.onResolve = resolve;
        this.onReject = reject;        
    }

    /**
     * exec this runnable, the default impl,
     * override this method in sub classes
     */
    run() {
        let r = Math.random();
        if (r> 0.5) {
            if(this.onResolve!=null) {
                this.onResolve(r);
            }
        }
        else {
            if(this.onReject!=null) {
                this.onReject(new Error("error") );
            }
        }
    }

    /**
     * get result
     * @returns result.
     */
    getResult() {
        return this.result;
    }
};

/**
 * executor to run runnables in series
 */
class SeriesExeccutor {

    constructor(runnables) {
        this.idx = 0;
        this.runnables = runnables;
        this.results = [];
    }    

    /**
     * run runnables in series
     * @param {callback} onResolve(results), results: result array
     * @param {callback} onReject(err, idx), idx: the index of the runnable that throws Error. 
     * @returns 
     */
    run(onResolve, onReject) {
        this.idx = 0;
        this.results = [];

        if(this.runnables==null || this.runnables.length<1) {
            onResolve(this.results);
            return;
        }

        const self = this;

        let runCurrentRunnable = function(resolve, reject) {
            let r = self.runnables[self.idx];
            console.log("running: ", r.getName());

            r.setCallback(resolve, reject);
            r.run();
        };

        let p = new Promise(runCurrentRunnable);

        let err = function(ex) {
            onReject(ex, self.idx);
        };

        let ok = function(result) {
            self.idx ++;
            self.results.push(result);

            if(self.idx<self.runnables.length) {
                let r0 = self.results[self.idx-1];
                self.runnables[self.idx].setR0(r0);
                // exec runnable in a new Promise
                new Promise(runCurrentRunnable).then(ok, err);
            }
            else {
                onResolve(self.results);
            }
        };
        p.then(ok, err);
    } 
};   

module.exports = {
    Runnable:Runnable,
    SeriesExeccutor: SeriesExeccutor
};
