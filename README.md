# ConnectionPoolHeatMapChart
Heat Map Chart for Connection Pool.<br>
This Chart will let the user to visualize how much of the connections are beings used.<br>
The Chart plays animations when it loads.<br>
This is very simplied by directly accepting a Connection Pool Status object.<br>
<br><b>:::Html:::</b>
```
<div id="ConnectionPoolHeatMap"></div>
```
<br><b>:::Javascript:::</b>
```
// Sample data
var connectionPoolStatus = {
	name: 'com.zaxxer.hikari:type=Pool (HikariCP)',
	totalConnections: 500,
	activeConnections: 370,
	idleConnections: 50,
	waitingConnections: 30
};

// To invoke
connectionPoolHeatMap('#ConnectionPoolHeatMap', connectionPoolStatus);
```
<br><b>:::Output:::</b>
<p align="center">
  <img src="https://github.com/VsVarun/ConnectionPoolHeatMapChart/blob/master/CPHeatMapChart.JPG?raw=true"/>
</p>


Your Valuable Suggestions are most welcome.
Kindly add it to the issues.
