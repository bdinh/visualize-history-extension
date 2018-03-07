export interface RawHistoryData {
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

export interface Test {
    baseURL: null|string;
    data: null|RawHistoryData[],
}
