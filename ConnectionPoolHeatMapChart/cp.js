/*
 * Author : Varun Chandresekar
 */
 
// Sample data
var connectionPoolStatus = {
	name: 'com.zaxxer.hikari:type=Pool (HikariCP)',
	totalConnections: 500,
	activeConnections: 370,
	idleConnections: 50,
	waitingConnections: 10
};

// To invoke
connectionPoolHeatMap('#ConnectionPoolHeatMap', connectionPoolStatus, true);


/*
 * Pass the HeatMapElementName{div name}, ConnectionPoolStatus object
 */
function connectionPoolHeatMap(heatMapElementName,data,animate){
  var rows=0,columns=0;
  var superTotalConnections = (data.totalConnections+data.waitingConnections);
  if(superTotalConnections >= 500){
	  columns = 30;
	  rows = superTotalConnections/columns;
  }else if(superTotalConnections >= 250){
	  columns = 25;
	  rows = superTotalConnections/columns;
  }else{
	  columns = 20;
	  rows = superTotalConnections/columns;
  }
  
  var connectionPoolArray = [];
  data.openConnections = (data.totalConnections - (data.activeConnections+data.idleConnections));
  if(data.openConnections<0){
	  data.openConnections = 0;
  }
  // Pushing Active Connections
  for(i=0;i<data.activeConnections;i++){
	  connectionPoolArray.push('cp-active');
  }
  // Pushing Idle Connections
  for(i=0;i<data.idleConnections;i++){
	  connectionPoolArray.push('cp-idle');
  }
  // Pushing Waiting Connections
  for(i=0;i<data.waitingConnections;i++){
	  connectionPoolArray.push('cp-waiting');
  }
  // Pushing Open Connections
  for(i=0;i<data.openConnections;i++){
	  connectionPoolArray.push('cp-open');
  }
  connectionPoolArray = shuffleArray(connectionPoolArray);
  $(heatMapElementName).innerHtml='';
  $(heatMapElementName).append('<table></table>');
  var table = $(heatMapElementName).children();
  var tableData = "";
  for(i=0;i<rows;i++){
	  tableData = tableData.concat("<tr>");
	  for(j=0;j<columns;j++){
		tableData = tableData.concat("<td class='").concat(connectionPoolArray.pop()).concat("'></td>");
	  }
	  tableData = tableData.concat("</tr>");
  }
  table.append(tableData);
  var legendTbl = '<table><tr>'
  legendTbl = legendTbl.concat('<td class="cp-legend-active">Active ( ').concat(data.activeConnections).concat(' )</td>');
  legendTbl = legendTbl.concat('<td class="cp-legend-idle">Idle ( ').concat(data.idleConnections).concat(' )</td>');
  legendTbl = legendTbl.concat('<td class="cp-legend-waiting">Waiting ( ').concat(data.waitingConnections).concat(' )</td>');
  legendTbl = legendTbl.concat('<td class="cp-legend-open">Open ( ').concat(data.openConnections).concat(' )</td></tr>');
  legendTbl = legendTbl.concat('<tr><td colspan="4">').concat(connectionPoolStatus.name).concat('</td></tr>');
  legendTbl = legendTbl.concat('</table>');
  $(heatMapElementName).append(legendTbl);
  if(animate){
	animate(data);
  }
};

/**
 * Animate the cp td classes
 */
function animate(data){
	if(data.activeConnections>0){
		$(".cp-active").effect( "pulsate", {times:1}, 1000 );
	}
	if(data.idleConnections>0){
		$(".cp-idle").effect( "pulsate", {times:1}, 1200 );
	}
	if(data.waitingConnections>0){
		$(".cp-waiting").effect( "pulsate", {times:1}, 1500 );
	}
	if(data.openConnections>0){
		$(".cp-open").effect( "pulsate", {times:1}, 1700 );
	}
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

