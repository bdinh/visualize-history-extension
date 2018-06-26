import { timeParse } from 'd3';
var WEEKDAYS = 7;
export function monthNumberFormatting(month) {
    if (month === 0) {
        return String(12);
    }
    else if (month <= 9) {
        return "0" + month;
    }
    else {
        return String(month);
    }
}
export function dateToString(date) {
    var year = date.getFullYear();
    var month = monthNumberFormatting(date.getMonth() + 1);
    var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    return String(year) + String(month) + String(day);
}
export function weekNumberFormatting(startWeek, currentWeek) {
    if (currentWeek >= startWeek) {
        return currentWeek - (startWeek);
    }
    else {
        if (currentWeek === 0) {
            return 52 - startWeek; // connect the last week with the first week
        }
        return currentWeek + (52 - startWeek);
    }
}
export function formatDateCountArray(allDates, dateDictionary) {
    var formattedDateCountArray = [];
    allDates.forEach(function (date) {
        var dateString = dateToString(date);
        var newObject = {};
        newObject.date = dateString;
        var visitCount = 0;
        if (dateDictionary[dateString] !== undefined) {
            visitCount = dateDictionary[dateString];
        }
        newObject.value = visitCount;
        formattedDateCountArray.push(newObject);
    });
    return formattedDateCountArray;
}
export function getAllDatesArray(startDate, endDate) {
    var allDatesArray = [];
    var currentDate = new Date(startDate);
    // Adds all the dates between the start and end
    while (currentDate <= endDate) {
        allDatesArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    // Adds the date before the start date to make it round out to a week
    var adjustStartDate = new Date(startDate);
    for (var i = startDate.getDay(); i > 0; i--) {
        adjustStartDate.setDate(adjustStartDate.getDate() - 1);
        allDatesArray.push(new Date(adjustStartDate));
    }
    // Adds the date before the start date to make it round out to a week
    var adjustEndDate = new Date(endDate);
    for (var i = endDate.getDay(); i < WEEKDAYS - 1; i++) {
        adjustEndDate.setDate(adjustEndDate.getDate() + 1);
        allDatesArray.push(new Date(adjustEndDate));
    }
    return allDatesArray;
}
export function getDateCountDictionary(rawData) {
    var dateCountDictionary = {};
    rawData.forEach(function (datum) {
        var visitTimeDate = new Date(datum.lastVisitTime);
        var result = dateToString(visitTimeDate);
        if (dateCountDictionary[result] !== undefined) {
            dateCountDictionary[result] = dateCountDictionary[result] + datum.visitCount;
        }
        else {
            dateCountDictionary[result] = datum.visitCount;
        }
    });
    return dateCountDictionary;
}
export function getYearRange(startDate, endDate) {
    var yearRange = [];
    // TODO: Account for scaling.
    // This works for a three month span but local storing of date will need to take in account
    // interval of dates
    var startDateYear = startDate.getFullYear();
    yearRange.push(startDateYear);
    var endDateYear = endDate.getFullYear();
    if (!(yearRange.indexOf(endDateYear) > -1)) {
        yearRange.push(endDateYear);
    }
    return yearRange;
}
export function getMonthRange(startDate, endDate, dateCountDictionary) {
    var monthRange = [];
    var startMonthValue = startDate.getMonth();
    while (startMonthValue !== endDate.getMonth() + 1) {
        monthRange.push(startMonthValue);
        startMonthValue = (startMonthValue + 1) % 12;
    }
    // TODO: Need to account for the distribution of dates in order to scale the month label axis
    if (Object.keys(dateCountDictionary).length < 28 * monthRange.length) {
        // remove the first month in array due to the fact that we may not have enough data on it
        // needs fixing in order to count for distribution but should always work with chrome data
        monthRange.splice(monthRange.length - 1, 1);
    }
    return monthRange;
}
export function getMonthArray(monthRange) {
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var monthStringArray = [];
    monthRange.forEach(function (index) {
        monthStringArray.push(month[index]);
    });
    return monthStringArray;
}
export function getHistoryFromDate(date, data) {
    var result = [];
    if (date !== null) {
        var dateStart_1 = new Date(date);
        var dateEnd_1 = new Date(date.setDate(date.getDate() + 1));
        result = data.filter(function (historyItem) {
            var itemDate = new Date(historyItem.lastVisitTime);
            // console.log(date < itemDate);
            // console.log(itemDate < dateEnd);
            return (dateStart_1 < itemDate && itemDate < dateEnd_1);
        });
        return result;
    }
    return result;
}
export function calculateVisitSummary(data) {
    var totalVisit = calculateTotalVisit(data);
    var weeklyVisit = Math.round(totalVisit / calculateTotalWeek(data));
    var monthlyVisit = Math.round(totalVisit / 3);
    var summaryData = {
        totalVisit: totalVisit,
        weeklyVisit: weeklyVisit,
        monthlyVisit: monthlyVisit,
    };
    return summaryData;
}
export function calculateTotalVisit(data) {
    var totalVisit = 0;
    data.forEach(function (historyData) {
        totalVisit += historyData.visitCount;
    });
    return totalVisit;
}
export function calculateTotalMonths(data) {
    var startDate = new Date(data[data.length - 1].lastVisitTime);
    var endDate = new Date(data[0].lastVisitTime);
    var startMonth = startDate.getMonth();
    var endMonth = endDate.getMonth();
    return startMonth - endMonth;
}
export function calculateTotalWeek(data) {
    var startDate = new Date(data[data.length - 1].lastVisitTime);
    var endDate = new Date(data[0].lastVisitTime);
    var allDatesArray = getAllDatesArray(startDate, endDate);
    return Math.round(allDatesArray.length / 7);
}
export function parseDate(dateString) {
    var d3ParseDate = timeParse("%Y%m%d");
    return d3ParseDate(dateString);
}
//# sourceMappingURL=utils.js.map