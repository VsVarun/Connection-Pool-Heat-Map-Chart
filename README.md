# ConnectionPoolHeatMapChart
Heat Map Chart for Connection Pool.<br>
This Chart will let the user to visualize how much of the connections are beings used.<br>
The Chart plays animations when it loads. Here is a <a href="http://vsvarun.github.io/ConnectionPoolHeatMapChart/">Sample demo</a>.<br>
This is very simplied by directly accepting a Connection Pool Status object.<br>
<br><b>:::Html:::</b>
```
<div id="ConnectionPoolHeatMap"></div>
```
<br><b>:::Imports:::</b>
```
:::StyleSheet:::  
<link rel="stylesheet" href="./ConnectionPoolHeatMapChart/cpStyle.css">

:::BootStrap Libraries(Optional):::
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> 
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"> </script> 

:::Snap SVG Libraries(Optional):::
<script src="http://snapsvg.io/assets/js/snap.svg-min.js"></script>

:::JS Libraries:::  
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
<script type="text/javascript" src="./ConnectionPoolHeatMapChart/cp.js"></script> 
```
<br><b>:::Javascript:::</b>
```
// Sample data
var connectionPoolStatus = {
	Name: 'com.zaxxer.hikari:type=Pool (HikariCP)',
	Total: 500,
	Active: 370,
	Idle: 50,
	Waiting: 30
};

// To invoke
// Syntax
connectionPoolHeatMap(heatMapElementName, data, renderType, animateFlag, boxSize);

// Aguments
HeatMapElementName   = '#div id'
ConnectionPoolStatus = { Name: 'Sample', Total: 500, Active: 370, Idle: 50, Waiting: 10 }
renderType           = [ TABLE or SVG or SnapSVG or CANVAS ]
animateFlag          = [ true or false ]
boxSize              = [ 1 - 10 ]

// Example 
connectionPoolHeatMap('#ConnectionPoolHeatMap', connectionPoolStatus, 'SnapSVG', true, 4);
```
<br><b>:::Output:::</b>
<p align="center">
  <img src="https://github.com/VsVarun/ConnectionPoolHeatMapChart/blob/master/CPHeatMapChart.JPG?raw=true"/>
</p>


Your Valuable Suggestions are most welcome.
Kindly add it to the issues.
