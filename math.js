const conditionals = require('./conditionals')

const parseMath = (rcktfun) => {
    let res = "could not interpret"
    switch(rcktfun[0]){
        case "<":
        case "<=":
        case ">":
        case ">=":
        case "+":
        case "-":
        case "/":
        case "*":
            res = arrayToString([rcktfun[1],rcktfun[0],rcktfun[2]])
            break
        case "=":
            res = arrayToString([rcktfun[1],rcktfun[0]+rcktfun[0]+rcktfun[0],rcktfun[2]])
            break
        case "remainder":
            res = arrayToString([rcktfun[1],"%",rcktfun[2]])
            break
        case "quotient":
            res = "Math.floor(" + isArr(rcktfun[1]) + "/" + isArr(rcktfun[2]) + ")"
            break
        case "floor":
            res = "Math.floor(" + isArr(rcktfun[1]) + ")"
            break
        case "ceiling":
            res = "Math.ceil(" + isArr(rcktfun[1]) + ")"
            break
        case "add1":
            res = isArr(rcktfun[1]) + "++"
            break
        case "sub1":
            res = isArr(rcktfun[1]) + "--"
            break
        case "expt":
            res = arrayToString([rcktfun[1], "**", rcktfun[2]])
            break
        case "sqr":
            res = arrayToString([rcktfun[1], "**", "2"])
            break
        case "sqrt":
            res = arrayToString([rcktfun[1], "**", "0.5"])
            break
        case "max":
        case "min":
            res = arrayToString(["Math." + rcktfun[0] + "(",rcktfun[1],",",rcktfun[2],")"])
            break
        case "log":
            res = "Math.log(" + isArr(rcktfun[1]) + ")"
            break
        default:
            res = "could not translate"
            break
    }
    return res
}

const arrayToString = (arr) => {
    let res = "";
    for (x of arr) {
        res += isArr(x) + " "
    }
    return res.trim()
}

const isArr = (x) => {
    if(Array.isArray(x)){
        return categorize(x)
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
        return conditionals(rktfun)
    }
}

exports = parseMath

// < <= = >= > + - / * remainder quotient floor ceiling add1 sub1 expt sqr sqrt max min log