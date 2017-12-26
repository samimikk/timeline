//
// Timeline
// --------
//
//  Create timeline using SVG
//
//
// @params id, data
// id : container div
// data: array of events (start year, end year, description (, color))
// start and end year as date-elements
//

function Timeline(id,data) {
  // Timeline Container (id)
  this.timeline = document.getElementById(id);
  this.timelineContainer =   this.timeline.getBoundingClientRect();
  // Timeline Width, based on width of container
  this.timelineWidth = this.timelineContainer.width;
  // SVG Object  */
  this.svgns = 'http://www.w3.org/2000/svg';
  this.svg = document.createElementNS(this.svgns, 'svg');
  this.fontSize = 16;
  // Default colors on timeline events */
  this.colors = ['red','green','blue','navy','yellow'];
  // Date details */
  this.startYear = new Date();
  this.endYear = new Date('1800-01-01');
  this.totalOfYears = 0;
  this.middleYear = 0;
  this.totalOfMonths = 0;
  this.monthOnGrid = 0;
  this.yearOnGrid = this.monthOnGrid * 12;
  // interval between begin and ending of timeline (in years)
  this.yearGap = 2;
  // Events on the timeline */
  // start date, end date, description (, color) */
  this.events = data;
  // store first, middle and last year data */
  this.years = [];

  // Create SVG
  this.createSVG(this.svgns,this.svg)
  // Get first year
  this.getGridStartYear(this.events);
  // Get last year
  this.getGridEndYear(this.events);
  // Return middle year
  this.getMiddleYear();

  // Create array of years
  this.addYearsToArray(this.startYear,this.endYear,this.middleYear);

  this.getTotalYears();

  this.getTotalMonths(this.totalOfYears);

  this.getMonthsForGrid(this.timelineWidth);

  this.getYearsForGrid(this.events,this.monthOnGrid);

  // Create year columns
  this.drawYearColumns(this.totalOfYears,this.monthOnGrid,this.svg);
  // Create Events
  this.drawEvents(this.events);
  // Create year labels
  this.createYearLabels(this.years);
  // Add SVG to page
  this.timeline.appendChild(this.svg);

}

Timeline.prototype.createSVG = function(ns,s) {
  for (var i=0;i<3;i++) {
    var g = document.createElementNS(ns,'g');
    s.appendChild(g);
  }
}

Timeline.prototype.getTimelineHeight = function(e) {
  var h = 0;
  var a = 0;
  if (e.length < 5) {
    a = 26;
  } else {
    a = 24;
  }

  for(var i=0;i<e.length;i++) {
    h = h + a;
  }
    return h;
}

Timeline.prototype.getTotalMonths = function(y) {
  this.totalOfMonths = y * 12;
  return this.totalOfMonths;

}

Timeline.prototype.getMonthsForGrid = function(w) {
  return this.monthOnGrid = w / this.totalOfMonths;
}

Timeline.prototype.getYearsForGrid = function() {

  return this.yearOnGrid = this.monthOnGrid * 12;
}

Timeline.prototype.getGridStartYear = function(e) {
  return this.startYear = this.returnYear(e,0,'min');
}

Timeline.prototype.getGridEndYear = function(e) {
  return this.endYear = this.returnYear(e,1,'max');
}

Timeline.prototype.returnYear = function(a,p,o) {
  for(var k=0;k<a.length; k++) {
    var year = a[k][p].getFullYear();
     // Get first year
    if (o === 'min') {
     if (year < this.startYear) {
        this.startYear = year;
     }
    }

    if (o === 'max') {
      if (year > this.endYear) {
        this.endYear =  year;
      }
    }
  }
  if ( o === 'min') {
    return this.startYear;
  } else {
    return this.endYear;
  }
}

Timeline.prototype.addYearsToArray = function(s,e,m) {
  s = s - this.yearGap;
  e = e + this.yearGap;
  this.years.push(s);
  this.years.push(m);
  this.years.push(e);
}

Timeline.prototype.addYears = function(a,o) {
  if (o === 'min') {
    y = y - this.yearGap;
  } else {
    y = y + this.yearGap;
  }
  return y;
}
Timeline.prototype.getTotalYears = function() {
  // Get total years
  return this.totalOfYears = this.years[2] - this.years[0];
}

Timeline.prototype.getMiddleYear = function(){
  // Get middle year
  return this.middleYear = ( this.endYear + this.startYear ) / 2;
}

Timeline.prototype.drawYearRow = function(e,m) {
  for (var i=0;1<e.length;i++) {
    var start = e[i][0];
    var end = e[i][1];
  }
}

Timeline.prototype.drawYearColumns = function(o,m,t) {
  o = o + 1;
  for (var i=0;i<o;i++) {

    var y = document.createElementNS(this.svgns,'line');
    var g = t.querySelectorAll('g');
    var g0 = g[0];
    if ( i == (o - 1) ) {
      y.setAttribute('x1',this.timelineWidth);
      y.setAttribute('x2',this.timelineWidth);
    } else {
      y.setAttribute('x1',i * ( m * 12 ));
      y.setAttribute('x2',i * ( m * 12 ));
    }

    y.setAttribute('y1','0');
    y.setAttribute('y2',this.getTimelineHeight(this.events));
    y.setAttribute('stroke-width','1');
    y.setAttribute('stroke','#505050');
    g0.appendChild(y);
  }
}

Timeline.prototype.createYearLabels = function(e) {
  for (var j=0;j<e.length;j++) {
    var y = document.createElementNS(this.svgns,'text');
    var node = e[j];
    var xPos = this.setX(e[j],e[0],(this.yearOnGrid + 2));
    var g2 = this.svg.querySelectorAll('g')[2];

    if (j === 1) {
      xPos = ( this.timelineWidth / 2 )  - 16;
    } else if ( j === ( e.length - 1)) {
      xPos = this.timelineWidth - 32;
   }

    y.innerHTML = node;
    y.setAttribute('y',this.getTimelineHeight(this.events) + 25);
    y.setAttribute('font-size',this.fontSize);
    y.setAttribute('fill','white');
    y.setAttribute('x',xPos);
    g2.appendChild(y);
  }
}

Timeline.prototype.drawEvents = function(e) {
  var nHeigth = 20;
  var g = this.svg.querySelectorAll('g')[1];
  for (var i=0; i<e.length;i++) {
    var y = document.createElementNS(this.svgns,'line');
    var node = e[i];
    var sYear = new Date(( this.startYear - this.yearGap )+"-01-01");
    var sMonth = this.calculateMonths(e[i][0], sYear);
    var eMonth = this.calculateMonths(e[i][1], sYear);
    var color = this.colors[i];
    if (e[i][3] != null) {
      this.color = e[i][3];
    }
    y.setAttribute('y1',nHeigth * (i + 1));
    y.setAttribute('y2',nHeigth * ( i + 1));
    y.setAttribute('x1',sMonth * this.monthOnGrid);
    y.setAttribute('x2',eMonth * this.monthOnGrid);
    y.setAttribute('stroke-width','10');
    y.setAttribute('stroke',this.color);
    g.appendChild(y);
  }
}

Timeline.prototype.calculateMonths = function(s,e) {
  return s.getMonth() - e.getMonth() + (12 * (s.getFullYear() - e.getFullYear()));
}

Timeline.prototype.setX = function(e,s,g){
  var r = (e - s) * g;
  return r;
}
