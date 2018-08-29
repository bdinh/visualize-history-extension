export interface HistoryEntry{
    id: string,
    title: string,
    url: string,
    visitCount: number,
    visits: VisitEntry[]
}

export interface VisitEntry {
    id: string,
    time: number
}

export interface ChromeHistoryItem {
    id: string,
    lastVisitTime: number,
    title: string,
    typedCount: number,
    url: string,
    visitCount: number
}

export interface HistoryDictionary {
    [key: string]: HistoryEntry
}
