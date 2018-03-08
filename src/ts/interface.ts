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

