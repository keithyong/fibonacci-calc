var MAXN = 200;
var UNKNOWN = -1;
var f = new Array(MAXN + 1);

/* D3 Tree variables */
var svgCanvasWidthOne = 700;
var svgCanvasHeightOne = 400;

var treeWidthOne = 450;
var treeHeightOne = 300;

var svgCanvasWidthTwo = 550;
var svgCanvasHeightTwo = 280;

var treeWidthTwo = 300;
var treeHeightTwo = 180;

var nodeFontSize = 12;
var nodeRadius = 12;

var mainColor = "#111111";

var strokeWidth = 1;

var nodeFontFamily = "Source Sans Pro";
var nodeFontFamilyCode = "Courier";
var nodeFontSize = 14;

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
 * Generate #recursionTreeOne
 *  
 * ------------------------------------------------------ */



var appendTreeToID = function(treeData, id, svgCanvasWidth, svgCanvasHeight, treeWidth, treeHeight) {
    var vis = d3.select(id).append("svg:svg")
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

    node.filter(function(d) {
        return d.num.charAt(0) != 'f';
    })
    .append("svg:circle")
    .attr("r", nodeRadius)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", strokeWidth);

    node.filter(function(d) {
        return d.num.charAt(0) == 'f';
    })
    .append("svg:rect")
    .attr("fill", "white")
    .attr("stroke", "#111111")
    .attr("stroke-width", strokeWidth)
    .attr("width", 38)
    .attr("height", 20)
    .attr("x", -20)
    .attr("y", -10)
    .attr("rx", "3")
    .attr("ry", "3");

    node.append("svg:text")
    .attr("dy", 3)
    .attr("text-anchor", "middle")
    .text(function(d) { return d.num; })
    .attr("font-size", nodeFontSize)
    .attr("font-family", function(d){
        if (d.num.charAt(0) === 'f')
            return nodeFontFamilyCode;
        else
            return nodeFontFamily;
    })
    .attr("fill", "#111111");
};

var treeOneData = {"num": "13", "info" : "tst", "children" : 
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
appendTreeToID(treeOneData, "#recursionTreeOne", svgCanvasWidthOne, svgCanvasHeightOne, treeWidthOne, treeHeightOne);
/* ------------------------------------------------------
 * 
 * Generate #recursionTreeTwo
 *  
 * ------------------------------------------------------ */

var treeTwoData = {
    "num": "13", "info" : "tst", "children" : 
    [
        {"num": "f[5]"},
        {"num": "8", "children" :
        [
            {"num": "5", "children" : 
            [
                {"num": "f[4]"},
                {"num": "f[3]"}
            ]},
            {"num": "3", "children" :
            [
                {"num": "1"},
                {"num": "1"}
            ]}
        ]},
        
    ]
};

appendTreeToID(treeTwoData, "#recursionTreeTwo", svgCanvasWidthTwo, svgCanvasHeightTwo, treeWidthTwo, treeHeightTwo);
