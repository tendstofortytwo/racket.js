const math = require('./math')

const parseConditional = (rcktfun) => {
    let res = "could not interpret"
    switch(rcktfun[0]){
        case "if":
            res = "if (" + isArr(rcktfun[1]) + "){\n" + isArr(rcktfun[2]) + "} else {\n" + isArr(rcktfun[3]) + "}\n"
            break;
        case "or":
            res = isArr(rcktfun[1]) + " || " + isArr(rcktfun[2])
            break;
        case "and":
            res = isArr(rcktfun[1]) + " && " + isArr(rcktfun[2])
            break;
        case "not":
            res = "!(" + isArr(rcktfun[1]) + ")"
            break
        case "cond":
            res = "if (" + isArr(rcktfun[1][0]) + "){\n" + isArr(rcktfun[1][1]) + "} "
            const toRunFor = rcktfun.length - 3
            for(let i = 0;i<toRunFor;i++){
                res += "else if (" + isArr(rcktfun[i+2][0]) + "){\n" + isArr(rcktfun[i+2][1]) + "}\n" 
            }
            res += "else {" + isArr(rcktfun[rcktfun.length-1][1]) + "}\n"
            break
        default:
            break
    }
    return res
}

const isArr = (x) => {
    if(Array.isArray(x)){
        return doCategorisation(x)
    }else{
        return x
    }
} 

let mathKeywords = ["<","<=", "=", ">=", ">", "+", "-", "/", "*", "remainder", "quotient", "floor", "ceiling", "add1", "sub1", "expt", "sqr", "sqrt", "max", "min", "log"];
let conditionalKeywords = ["if", "or", "and", "cond", "not"]

let doCategorisation = (rktfun) => {
    const keyword = rktfun[0];
    if(mathKeywords.includes(keyword)){
        return math(rktfun)
    }else if(conditionalKeywords.includes(keyword)){
        return parseConditional(rktfun)
    }
}

exports = parseConditional;

// if or and cond not 