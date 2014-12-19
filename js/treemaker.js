var svgCanvasWidth = 700;
var svgCanvasHeight = 500;

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
