//
//
// import * as d3 from 'd3';
// import * as moment from 'moment';
// import * as $ from 'jquery';
// import { weekNumberFormatting, formatDateCountArray } from "./utils";
//
// export function createCalendarViewChart() :void {
//
//     let day = d3.timeFormat("%w");
//     let week = d3.timeFormat("%U");
//     let format = d3.timeFormat("%Y%m%d");
//     let parseDate = d3.timeParse("%Y%m%d");
//
//     let width = $('.calendar-view').width();
//     let height = 200;
//     let cellSize = 20;
//     let weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
//     let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//
//
//
//
// //
// //     let dateCountArray :DateCount[] = formatDateCountArray(rectData, dictionary);
// //
// //     let width = $('.calendar-view').width();
// //     let height = 200;
// //     let cellSize = 20;
// //     let weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
// //     let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
// //
// //     let monthFormat :string[] = [];
// //     monthRange.forEach((index) => {
// //         monthFormat.push(month[index])
// //     });
// //
// //     let color = d3.scaleLinear()
// //         .domain([0, 1])
// //         .range(['#e5e9ed', '#002b51']);
// //
// //     let svg = d3.select(".calendar-view").selectAll("svg")
// //         .data(d3.range(yearRange[0], yearRange[yearRange.length - 1],))
// //         .enter().append("svg")
// //         .attr("width", width)
// //         .attr("height", height)
// //         .attr("class", "RdYlGn")
// //         .append("g")
// //         .attr("transform", "translate(" + "50" + "," + (height - cellSize * 7 - 1) + ")");
// //
// //
// //     svg.append("text")
// //         .attr("transform", "translate(30, -35)")
// //         .style("text-anchor", "middle")
// //         .text(function(d) { return "Past 3 Month History"; });
// //
// //     for (let i=0; i<7; i++)
// //     {
// //         svg.append("text")
// //             .attr("transform", "translate(-5," + cellSize*(i+1) + ")")
// //             .style("text-anchor", "end")
// //             .style("font-size", "0.75em")
// //             .attr("dy", "-.25em")
// //             .text(function(d) { return weekdays[i]; });
// //     }
// //
// //     let rect = svg.selectAll(".day")
// //         .data(rectData)
// //         .enter()
// //         .append("rect")
// //         .attr("class", "day")
// //         .attr("width", cellSize)
// //         .attr("height", cellSize)
// //         .attr("x", (d) => { return weekNumberFormatting(week(startDate), Number(week(d))) * cellSize; })
// //         .attr("y", (d) => { return day(d) * cellSize; })
// //         .attr("fill",'#ebedf0')
// //         .datum(format);
// //
// //     let legend = svg.selectAll(".legend")
// //         .data(monthFormat)
// //         .enter().append("g")
// //         .attr("class", "legend")
// //         .attr("transform", function(d, i) { return "translate(" + (((i) * 75)+75) + ",-5)"; });
// //
// //     legend.append("text")
// //         .attr("class", function(d,i){ return monthFormat[i] })
// //         .style("text-anchor", "end")
// //         .style("font-size", "1em")
// //         .attr("dy", "-.3em")
// //         .text(function(d,i){ return monthFormat[i] });
// //
// //     let maxVisitCount = d3.max(dateCountArray, (d) => { return d.value});
// //     let plottingData :Object= d3.nest()
// //         .key((d) => { return d.date; })
// //         .rollup((d) => { return Math.sqrt(d[0].value / maxVisitCount); })
// //         .map(dateCountArray);
// //
// //     let tooltip = d3.select("body").append("div").attr("class", "toolTip");
// //
// //     rect.filter(function(d) { return plottingData["$" + d] >= 0 })
// //         .attr("fill", function(d) { return color(plottingData["$" + d]); })
// //         .on('mouseover', (d) => {
// //             d3.select(d3.event.path[0])
// //                 .style('stroke', 'black');
// //             let shift = 0;
// //             if (d3.event.pageX > 175) {
// //                 shift = -150
// //             }
// //             let hoverExpression = "Visit";
// //             let clickValue = 0;
// //             if (dictionary[d] !== undefined) {
// //                 clickValue = dictionary[d];
// //                 hoverExpression = "Visits";
// //             }
// //             tooltip
// //                 .style("left", d3.event.pageX + shift + "px")
// //                 .style("top", d3.event.pageY + "px")
// //                 .style("display", "inline-block")
// //                 .html(clickValue + " " + hoverExpression + " on " + "<span class='hover-date'>" + moment(d).format('MMM Do, YYYY') + "</span>")
// //
// //         })
// //         .on('mouseout', (d) => {
// //             d3.select(d3.event.path[0])
// //                 .style('stroke', 'white');
// //             tooltip
// //                 .style('display', 'none');
// //         });
// }
//
// export function drawAllRectLayer(svg: any, allDatesArray: Date[] ) :{} {
//     let rect = svg.selectAll(".day")
//         .data(allDatesArray)
//         .enter()
//         .append("rect")
//         .attr("class", "day")
//         .attr("width", cellSize)
//         .attr("height", cellSize)
//         .attr("x", (d) => { return weekNumberFormatting(week(startDate), Number(week(d))) * cellSize; })
//         .attr("y", (d) => { return day(d) * cellSize; })
//         .attr("fill",'#ebedf0')
//         .datum(format);
//     return rect;
// }
