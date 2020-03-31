var output = document.getElementById("displayScreen");
var prevAns = document.getElementById("prevAns");
var buttons = document.getElementsByTagName("button");
output.value = "";

function displayNum(value) {
    if (output.value.length < 1 && value == ".") {
        output.value = "0.";
    } else if (output.value.length < 1 && value == "e") {
        output.value = "1e";
    } else if (output.value.length > 1 && output.value.charAt(output.value.length - 1) == ")" && Number(value)) {
        output.value += "*" + value;
    } else {
        output.value += value;
    }
}

function clearScreen() {
    output.value = "";
}

function backspace() {
    output.value = output.value.slice(0, output.value.length - 1);
}

function trig(x) {
    if (output.value.indexOf(x) != -1) {
        var getFirstIndex = output.value.indexOf(x);
        var slicePart = output.value.slice(getFirstIndex + x.length);
        var getLastPart = slicePart.indexOf(")");
        var num, trigFunc, wholeText, prevNum;
        if (getLastPart != -1) {
            num = output.value.slice(getFirstIndex + x.length, getFirstIndex + x.length + getLastPart);
            switchCase(x);
            wholeText = output.value.slice(getFirstIndex, getFirstIndex + x.length + 1 + getLastPart);
        } else {
            num = output.value.slice(getFirstIndex + x.length);
            switchCase(x);
            wholeText = output.value.slice(getFirstIndex);
        }
        output.value = output.value.replace(wholeText, trigFunc);
        prevNum = getFirstIndex - 1;
        if (output.value[prevNum] != undefined && Number(output.value[prevNum])) {
            output.value = output.value.slice(0, prevNum + 1) + "*" + output.value.slice(prevNum + 1);
        }
    }

    function switchCase(value) {
        switch (value) {
            case "sin(":
                trigFunc = Math.sin(num * Math.PI / 180);
                break;
            case "cos(":
                trigFunc = Math.cos(num * Math.PI / 180);
                break;
            case "tan(":
                trigFunc = Math.tan(num * Math.PI / 180);
                break;
            case "log(":
                trigFunc = Math.log(num) / Math.log(10);
                break;
            case "In(":
                trigFunc = Math.log(num);
                break;
            case "√(":
                trigFunc = Math.sqrt(num);
                break;
            default:
                break;
        }
        trigFunc = trigFunc.toFixed(4);
    }
}

function calculateResult() {
    var toSolve = output.value;
    var result, val;
    for (i = 0; i < output.value.length; i++) {
        var sin, cos, tan, In, log, sqrt;
        sin = output.value.indexOf("sin", i), cos = output.value.indexOf("cos", i), tan = output.value.indexOf("tan", i);
        In = output.value.indexOf("In", i), log = output.value.indexOf("log", i), sqrt = output.value.indexOf("√", i);
        if (sin != -1) {
            val = "sin(";
        } else if (cos != -1) {
            val = "cos(";
        } else if (tan != -1) {
            val = "tan(";
        } else if (In != -1) {
            val = "In(";
        } else if (log != -1) {
            val = "log(";
        } else if (sqrt != -1) {
            val = "√(";
        }
        trig(val);

        if (output.value[i] == "^") {
            var checkNum, num = "", reverseNum = "", computedValue;
            for (checkNum = i - 1; checkNum >= 0; checkNum--) {
                if (Number(output.value[checkNum]) || output.value[checkNum] == "." || output.value[checkNum] == "0") {
                    num += output.value[checkNum];
                } else {
                    break;
                }
            }
            for (checkNum = num.length - 1; checkNum >= 0; checkNum--) {
                reverseNum += num[checkNum];
            }
            output.value = output.value.replace("^(-1)", "");
            computedValue = 1/reverseNum;
            output.value = output.value.replace(reverseNum, computedValue);
        }
    }

    result = eval(output.value);
    if (Number(result)) {
        output.value = prevAns.value = result;
    } else {
        alert("Syntax error");
        output.value = toSolve;
    }
}

function previousAns() {
    if (prevAns.value == undefined || prevAns.value == "Ans") {
        prevAns.value = 0;
    } else if (Number(output.value.charAt(output.value.length - 1))) {
        output.value += "*" + prevAns.value;
    } else {
        output.value += prevAns.value;
    }
}

function switchOn() {
    for (i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("disabled");
    }
}

function switchOff() {
    for (i = 0; i < buttons.length; i++) {
        if (buttons[i].value == "on") {
            continue;
        } else {
            buttons[i].classList.add("disabled");
        }
    }
    output.value = "";
}