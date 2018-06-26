import {DateCount, HistoryData, SummaryData } from "./interface";
import {timeParse} from 'd3';

const WEEKDAYS: number = 7;

export function monthNumberFormatting(month: number) :string {
    if (month === 0) {
        return String(12);
    } else if (month <= 9) {
        return "0" + month;
    } else {
        return String(month)
    }
}

export function dateToString(date: Date) :string {
    let year: number | string = date.getFullYear();
    let month: number | string  = monthNumberFormatting(date.getMonth() + 1);
    let day: number | string = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    return String(year) + String(month) + String(day);
}

export function weekNumberFormatting(startWeek: number, currentWeek: number) :number {
    if (currentWeek >= startWeek) {
        return currentWeek - (startWeek);
    } else {
        if (currentWeek === 0) {
            return 52 - startWeek; // connect the last week with the first week
        }
        return currentWeek + (52 - startWeek);
    }
}

export function formatDateCountArray(allDates: Date[], dateDictionary: {}) :DateCount[] {
    let formattedDateCountArray :DateCount[] = [];
    allDates.forEach((date: Date) => {
        let dateString: string = dateToString(date);
        let newObject: DateCount = {} as DateCount;
        newObject.date = dateString;
        let visitCount: number = 0;
        if (dateDictionary[dateString] !== undefined) {
            visitCount = dateDictionary[dateString];
        }
        newObject.value = visitCount;
        formattedDateCountArray.push(newObject);
    });
    return formattedDateCountArray;
}

export function getAllDatesArray(startDate: Date, endDate: Date) :Date[] {
    let allDatesArray: Date[] = [];
    let currentDate: Date = new Date(startDate);
    // Adds all the dates between the start and end
    while (currentDate <= endDate) {
        allDatesArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1)
    }
    // Adds the date before the start date to make it round out to a week
    let adjustStartDate: Date = new Date(startDate);
    for ( let i: number = startDate.getDay(); i > 0; i--) {
        adjustStartDate.setDate(adjustStartDate.getDate() - 1);
        allDatesArray.push(new Date(adjustStartDate));
    }
    // Adds the date before the start date to make it round out to a week
    let adjustEndDate: Date = new Date(endDate);
    for (let i: number = endDate.getDay(); i < WEEKDAYS - 1; i++) {
        adjustEndDate.setDate(adjustEndDate.getDate() + 1);
        allDatesArray.push(new Date(adjustEndDate));
    }
    return allDatesArray;
}

export function getDateCountDictionary(rawData: HistoryData[]) :{} {
    let dateCountDictionary = {};
    rawData.forEach((datum: HistoryData) => {
        let visitTimeDate = new Date(datum.lastVisitTime);
        let result = dateToString(visitTimeDate);

        if (dateCountDictionary[result] !== undefined) {
            dateCountDictionary[result] = dateCountDictionary[result] + datum.visitCount;
        } else {
            dateCountDictionary[result] = datum.visitCount;
        }
    });
    return dateCountDictionary;
}

export function getYearRange(startDate: Date, endDate: Date) : number[] {
    let yearRange :number[] = [];
    // TODO: Account for scaling.
    // This works for a three month span but local storing of date will need to take in account
    // interval of dates
    let startDateYear: number = startDate.getFullYear();
    yearRange.push(startDateYear);

    let endDateYear: number = endDate.getFullYear();
    if (!(yearRange.indexOf(endDateYear) > -1)) {
        yearRange.push(endDateYear)
    }
    return yearRange;
}

export function getMonthRange(startDate: Date, endDate: Date, dateCountDictionary: Object) :number[] {
    let monthRange: number[] = [];

    let startMonthValue = startDate.getMonth();
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

export function getMonthArray(monthRange: number[]) :string[] {
    let month: string[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let monthStringArray :string[] = [];
    monthRange.forEach((index) => {
        monthStringArray.push(month[index])
    });
    return monthStringArray;
}


export function getHistoryFromDate(date: Date, data: HistoryData[]) :HistoryData[] {
    let result: HistoryData[] = [];
    if (date !== null) {
        let dateStart: Date = new Date(date);
        let dateEnd: Date = new Date(date.setDate(date.getDate() + 1));
        result = data.filter((historyItem: HistoryData) => {
            let itemDate: Date = new Date(historyItem.lastVisitTime);
            // console.log(date < itemDate);
            // console.log(itemDate < dateEnd);
            return (dateStart < itemDate && itemDate < dateEnd)
        });
        return result;
    }
    return result;

}


export function calculateVisitSummary(data: HistoryData[]) :SummaryData {
    let totalVisit :number = calculateTotalVisit(data);
    let weeklyVisit :number = Math.round(totalVisit / calculateTotalWeek(data));
    let monthlyVisit :number = Math.round(totalVisit / 3);
    let summaryData: SummaryData = {
        totalVisit: totalVisit,
        weeklyVisit: weeklyVisit,
        monthlyVisit: monthlyVisit,
    }
    return summaryData;
}


export function calculateTotalVisit(data: HistoryData[]) :number {
    let totalVisit: number  = 0;
    data.forEach((historyData: HistoryData) => {
        totalVisit += historyData.visitCount;
    });
    return totalVisit;
}

export function calculateTotalMonths(data: HistoryData[]) :number {
    let startDate: Date = new Date(data[data.length - 1].lastVisitTime);
    let endDate: Date = new Date(data[0].lastVisitTime);
    let startMonth: number = startDate.getMonth();
    let endMonth: number = endDate.getMonth();
    return startMonth - endMonth;
}

export function calculateTotalWeek(data: HistoryData[]) :number {
    let startDate: Date = new Date(data[data.length - 1].lastVisitTime);
    let endDate: Date = new Date(data[0].lastVisitTime);
    let allDatesArray: Date[] = getAllDatesArray(startDate, endDate);
    return Math.round(allDatesArray.length / 7);
}

export function parseDate(dateString: string) :Date {
    let d3ParseDate = timeParse("%Y%m%d");
    return d3ParseDate(dateString);
}
