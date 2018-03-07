import {DateCount, RawHistoryData} from "./interface";

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

export function getDateCountDictionary(rawData: RawHistoryData[]) :{} {
    let dateCountDictionary = {};
    rawData.forEach((datum: RawHistoryData) => {
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
