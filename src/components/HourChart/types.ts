export interface HourChartProps {
    
}

export interface HourChartState {
    
}

export interface XAxisProps {
    translation: Transform
}

interface Transform {
    x: number,
    y: number
}

export interface MinuteDictionary {
    [key: string]: MinuteDatum
}

export interface MinuteDatum {
    count: number,
    time: Date
}

export interface HourPlotDatum {
    
}