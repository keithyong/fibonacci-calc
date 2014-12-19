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

/* ------------------------------------------------------
 * 
 * Recursion Tree Script
 *  
 * ------------------------------------------------------ */
var svgCanvasWidth = 700;
var svgCanvasHeight = 400;

var treeWidth = 450;
var treeHeight = 300;

var nodeFontSize = 14;

var treeData = {"num": "13", "info" : "tst", "children" : 
    [
        {"num" : "5", "children" : [
            {"num" : "3", "children" : [
                {"num" : "2", "children" : [
                        {"num" : "1"},
                        {"num" : "1"}
                        ]}, 
                    {"num" : "1"}
            ]},
            {"num" : "2", "children" : [
                    {"num" : "1"},
                    {"num" : "1"}
                    ]}
            ]},
        {"num" : "8", "children": [
            {"num" : "5", "children" : [
                {"num" : "3", "children" : [
                    {"num" : "2", "children" : [
                        {"num" : "1"},
                        {"num" : "1"}
                    ]},
                    {"num" : "1"}
                ]
                },
                {"num" : "2", "children" : [
                    {"num" : "1"},
                    {"num" : "1"}
                ]}
                ]},
            {"num" : "3", "children" : [
                {"num" : "2", "children" : [
                        {"num" : "1"},
                        {"num" : "1"}
                        ]}, 
                    {"num" : "1"}
            ]}
            ]
        }
    ]
};
    var vis = d3.select("#recursionTreeOne").append("svg:svg")
    .attr("width", svgCanvasWidth)
    .attr("height", svgCanvasHeight)
    .append("svg:g")
    .attr("transform", "translate(40, 40)");

    // Create a tree "canvas"
    var tree = d3.layout.tree().size([treeWidth, treeHeight]);

    var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.x, d.y]; });

    var nodes = tree.nodes(treeData);
    var links = tree.links(nodes);

    var link = vis.selectAll("pathlink")
    .data(links)
    .enter().append("svg:path")
    .attr("class", "link")
    .attr("d", diagonal)

    var node = vis.selectAll("g.node")
    .data(nodes)
    .enter().append("svg:g")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y +")";})

    node.append("svg:circle")
    .attr("r", 3.5);

    node.append("svg:text")
    .attr("dx", function(d) { return d.children ? -8: 8; })
    .attr("dy", 3)
    .attr("text-anchor", function (d) {return d.children ? "end" : "start"; })
    .text(function(d) { return d.num; })
    .attr("font-size", nodeFontSize)
