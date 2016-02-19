/*
 * Author : Varun Chandresekar
 */
 // Sample data
 /*
var connectionPoolStatus = {
	Name: 'com.zaxxer.hikari:type=Pool (HikariCP)',
	Total: 500,
	Active: 370,
	Idle: 50,
	Waiting: 10
};
*/
/*
 * Pass the HeatMapElementName{div name}, ConnectionPoolStatus, renderType, animateFlag object
 * HeatMapElementName{div name}
 * ConnectionPoolStatus = { Name: 'Sample', Total: 500, Active: 370, Idle: 50, Waiting: 10 }
 * renderType = [ TABLE or SVG or SnapSVG or CANVAS ]
 * animateFlag = [ true or false ]
 */
function connectionPoolHeatMap(heatMapElementName, data, shuffle, renderType, animateFlag, boxSize){
  var rows=0,columns=0;
  var superTotal = (data.Total+data.Waiting);
  if(superTotal >= 500){
	  columns = 30;
	  rows = superTotal/columns;
  }else if(superTotal >= 250){
	  columns = 25;
	  rows = superTotal/columns;
  }else{
	  columns = 20;
	  rows = superTotal/columns;
  }
  
  var connectionPoolArray = [];
  data.Open = (data.Total - (data.Active+data.Idle));
  if(data.Open<0){
	  data.Open = 0;
  }
  // Pushing Open Connections
  for(i=0;i<data.Open;i++){
	  if(animateFlag){
		connectionPoolArray.push('cp-animated-open');
	  }else{
		connectionPoolArray.push('cp-open');
	  }
  }
  // Pushing Idle Connections
  for(i=0;i<data.Idle;i++){
	  if(animateFlag){
		connectionPoolArray.push('cp-animated-idle');
	  }else{
		connectionPoolArray.push('cp-idle');
	  }
  }
  // Pushing Waiting Connections
  for(i=0;i<data.Waiting;i++){
	  if(animateFlag){
		connectionPoolArray.push('cp-animated-waiting');
	  }else{
		connectionPoolArray.push('cp-waiting');
	  }
  }
  // Pushing Active Connections
  for(i=0;i<data.Active;i++){
	  if(animateFlag){
		connectionPoolArray.push('cp-animated-active');
	  }else{
		connectionPoolArray.push('cp-active');
	  }
  }
  
  if(shuffle){
	connectionPoolArray = shuffleArray(connectionPoolArray);
  }
  $(heatMapElementName).hide();
  $(heatMapElementName).innerHtml='';
  if(renderType == 'TABLE'){
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
  }else if(renderType == 'SVG'){
	  var boxSize = (boxSize == undefined)?2:boxSize;
	  var defaultSize = boxSize * 5;
	  var svgHeight = (rows * defaultSize);
	  var svgWidth = (columns * defaultSize);
	  var svgData = '<svg class="cpHeatMapChartSVG" width="'+svgWidth+'" height="'+svgHeight+'">';
	  svgData = svgData.concat('<rect x="0"    y="0"  class="layout" />');	  
	  
	  var heatMapData = "";
	  for(i=0;i<rows;i++){
		  var yaxis = (i*defaultSize);
		  for(j=0;j<columns;j++){
			 var xaxis = (j*defaultSize);
			 svgData = svgData.concat('<rect x="'+xaxis+'"   y="'+yaxis+'" width="'+defaultSize+'" height="'+defaultSize+'" class="rect '+connectionPoolArray.pop()+'"> ');
			 svgData = svgData.concat('</rect>');
		  }
	  }
	  svgData = svgData.concat('</svg>');
	  $(heatMapElementName).append(svgData);
  }else if(renderType == 'SnapSVG'){
	  var svgName = heatMapElementName.substring(1, heatMapElementName.length).concat("_svg");
	  var boxSize = (boxSize == undefined)?2:boxSize;
	  var defaultSize = boxSize * 5;
	  var svgHeight = (rows * defaultSize)+6;
	  var svgWidth = (columns * defaultSize);
	  $(heatMapElementName).append('<svg id="'+svgName+'" width="'+svgWidth+'" height="'+svgHeight+'" class="layout"></svg>');
	  
	  var s = Snap('#'+svgName);
	  var yAxis = undefined;
	  var xAxis = undefined;
	  for(i=0;i<rows;i++){
		  yAxis = (i*defaultSize);
		  for(j=0;j<columns;j++){
			 xAxis = (j*defaultSize);
			 s.rect(xAxis,yAxis,defaultSize,defaultSize).attr("class","rect "+connectionPoolArray.pop());
		  }
	  }
  }else if(renderType == 'CANVAS'){
  }
  
  // Legends
  var legendTbl = '<table width="'+svgWidth+'px" class="legendTable"><tr>'
	  legendTbl = legendTbl.concat('<td class="legendTableTD cp-legend-active">Active ( ').concat(data.Active).concat(' )</td>');
	  legendTbl = legendTbl.concat('<td class="legendTableTD cp-legend-waiting">Waiting ( ').concat(data.Waiting).concat(' )</td>');
	  legendTbl = legendTbl.concat('<td class="legendTableTD cp-legend-idle">Idle ( ').concat(data.Idle).concat(' )</td>');
	  legendTbl = legendTbl.concat('<td class="legendTableTD cp-legend-open">Open ( ').concat(data.Open).concat(' )</td></tr>');
	  legendTbl = legendTbl.concat('<tr><td colspan="4" class="legendTableTD cp-legend-name">').concat(data.Name).concat('</td></tr>');
	  legendTbl = legendTbl.concat('</table>');
	  $(heatMapElementName).append(legendTbl);
  $(heatMapElementName).show();
  if(animateFlag){
	animate(data);
  }
  
}

/**
 * Animate the cp td classes
 */
function animate(data){
	$(".cp-animated-active").effect( "pulsate", {times:3}, 3000 );
	if(data.Active>0){
		setInterval(function(){
			$(".cp-animated-active").effect( "pulsate", {times:3}, 3000 );
		},8000);
	}
	if(data.Idle>0){
		$(".cp-animated-idle").effect( "pulsate", {times:2}, 3200 );
		setInterval(function(){
			$(".cp-animated-idle").effect( "pulsate", {times:2}, 3200 );
		},8000);
	}
	if(data.Waiting>0){
		$(".cp-animated-waiting").effect( "pulsate", {times:2}, 3500 );
		setInterval(function(){
			$(".cp-animated-waiting").effect( "pulsate", {times:2}, 3500 );
		},8000);
	}
	if(data.Open>0){
		$(".cp-animated-open").effect( "pulsate", {times:2}, 3500 );
		setInterval(function(){
			$(".cp-animated-open").effect( "pulsate", {times:2}, 3500 );
		},8000);
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

