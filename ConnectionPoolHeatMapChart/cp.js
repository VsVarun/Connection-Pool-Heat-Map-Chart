/*
 * Author : Varun Chandresekar
 */
 
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
connectionPoolHeatMap('#ConnectionPoolHeatMap1', connectionPoolStatus);

/*
 * Pass the HeatMapElementName{div name}, ConnectionPoolStatus object
 */
function connectionPoolHeatMap(heatMapElementName,data){
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
  var openConnections = (data.totalConnections - (data.activeConnections+data.idleConnections));
  if(openConnections<0){
	  openConnections = 0;
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
  for(i=0;i<openConnections;i++){
	  connectionPoolArray.push('cp-open');
  }
  connectionPoolArray = shuffleArray(connectionPoolArray);
  $(heatMapElementName).innerHtml='';
  $(heatMapElementName).append('<table></table>');
  var table = $(heatMapElementName).children();
  for(i=0;i<rows;i++){
	  var tableData = "<tr>";
	  for(j=0;j<columns;j++){
		tableData = tableData +"<td class='"+connectionPoolArray.pop()+"'></td>";
	  }
	  tableData = tableData + "</tr>"
	  table.append(tableData);
  }
  var legendTbl = '<table><tr>'
  legendTbl = legendTbl  + '<td class="cp-legend-active">Active ( '+data.activeConnections+' )</td>';
  legendTbl = legendTbl  + '<td class="cp-legend-idle">Idle ( '+data.idleConnections+' )</td>';
  legendTbl = legendTbl  + '<td class="cp-legend-waiting">Waiting ( '+data.waitingConnections+' )</td>';
  legendTbl = legendTbl  + '<td class="cp-legend-open">Open ( '+openConnections+' )</td></tr>';
  legendTbl = legendTbl  + '<tr><td colspan="4">'+connectionPoolStatus.name+'</td></tr>';
  legendTbl = legendTbl  + '</table>';
  $(heatMapElementName).append(legendTbl);
  
  animate();
};

/**
 * Animate the cp td classes
 */
function animate(){
	$(".cp-active").effect( "pulsate", {times:5}, 4500 );
	$(".cp-idle").effect( "pulsate", {times:5}, 5000 );
	$(".cp-waiting").effect( "pulsate", {times:5}, 5500 );
	$(".cp-open").effect( "highlight", {times:5}, 6000 );
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
