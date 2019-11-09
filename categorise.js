let mathKeywords = ["<","<=", "=", ">=", ">", "+", "-", "/", "*", "remainder", "quotient", "floor", "ceiling", "add1", "sub1", "expt", "sqr", "sqrt", "max", "min", "log"];
let conditionalKeywords = ["if", "or", "and", "cond", "not"]

//MATH BEGINS
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
// MATH ENDS

//CONDITONALS START

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
            res += "else {\n" + isArr(rcktfun[rcktfun.length-1][1]) + "}\n"
            break
        default:
            break
    }
    return res
}

//CONDITIONALS END


// DEFINITION BEGINS

const parseDefinition = (rktfun) => {
    let res = "could not interpret"
    let paramaterArray = rktfun[1]
    let parameters = ""
    for (let i=1;i<paramaterArray.length;i++){
        parameters+= paramaterArray[i] + " "
    }
    res = "const " + rktfun[1][0] + " = (" + parameters + ") => {\n" + isArr(rktfun[2]) + "\n}\nconsole.log(" + rktfun[1][0] + ")\n\n"
    return res
}

// DEFINITION ENDS

const arrayToString = (arr) => {
    let res = "";
    for (x of arr) {
        res += isArr(x) + " "
    }
    return res.trim()
}

const isArr = (x) => {
    if(Array.isArray(x)){
        return doCategorisation(x)
    }else{
        return x
    }
} 

//CATEGORISATION STARTS

let doCategorisation = (rktfun) => {
    const keyword = rktfun[0];
    if(mathKeywords.includes(keyword)){
        return parseMath(rktfun)
    }else if(conditionalKeywords.includes(keyword)){
        return parseConditional(rktfun)
    }else if(keyword === "define"){
        return parseDefinition(rktfun)
    }
}

// CATEGORISATION ENDS

exports = doCategorisation;