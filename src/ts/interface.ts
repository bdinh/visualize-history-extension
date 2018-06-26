export interface HistoryData {
    id: string,
    lastVisitTime: number,
    title: string,
    typedCount: number,
    url: string,
    visitCount: number,
}

export interface DateCount {
    date: string,
    value: number,
}

export interface AppState {
    baseURL: null|string;
    data: null|HistoryData[],
    monthRange: number[],
    yearRange: number[],
    startDate: Date,
    endDate: Date,
    dictionary: {},
    preppedData: {}
}

export interface DashBoardState {
    searchTerm: string | null,
    data: HistoryData[],
    selected: string,
    maxShow: number
}

export interface DashBoardProp {
    query: any
}

export interface SummaryData {
    totalVisit: number,
    weeklyVisit: number,
    monthlyVisit: number
}

export interface PopupProps {
    startongDate: string
}

