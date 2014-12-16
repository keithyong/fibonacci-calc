var MAXN = 200;
var UNKNOWN = -1;
var f = new Array(MAXN + 1);

function init(){
    var num = parseInt(document.getElementById("numinput").value);
    document.getElementById("result").innerHTML = "The " + num + "th Fibonacci number is ";
    document.getElementById("runningTime").innerHTML = "Calculated in ";
    return num;
}

function printResults(result, elapsedTime){
    document.getElementById("result").innerHTML += "<code>" + result + "</code>.";
    if (elapsedTime >= 100) {
        document.getElementById("runningTime").innerHTML += elapsedTime/1000 + " seconds";
    }
    else if (elapsedTime == 1){
        document.getElementById("runningTime").innerHTML += elapsedTime + " millisecond";
    } 
    else {
        document.getElementById("runningTime").innerHTML += elapsedTime + " milliseconds";
    }
}

function runFastFib(){
    var start = new Date().getTime();
    var num = init();
    var result = fib(num);
    var elapsed = new Date().getTime() - start;
    printResults(result, elapsed);
}

function runSlowFib(){
    var num = init();
    if (num > 42){
        var confirmation = confirm("Warning: the program will take more than five seconds to calculate!");
    }
    var start = new Date().getTime();
    var result = slowFib(num);
    var elapsed = new Date().getTime() - start;
    printResults(result, elapsed);
}

function fib(n){
    f[0] = 0;
    f[1] = 1;

    for (var i = 2; i <= n; i++){
        f[i] = UNKNOWN;
    }

    return actualFib(n);
}

function actualFib(n){
    if (n === 0){
        return f[0];
    }
    if (n === 1){
        return f[1];
    }
    if (f[n - 2] === UNKNOWN){
        f[n - 2] = actualFib(n - 2); }
    if (f[n - 1] === UNKNOWN){
        f[n - 1] = actualFib(n - 1);
    }

    f[n] = f[n - 1] + f[n - 2];

    return f[n];
}

function slowFib(n){
    if (n == 0){
        return 0;
    }
    if (n == 1){
        return 1;
    }
    return slowFib(n - 1) + slowFib(n - 2);
}

