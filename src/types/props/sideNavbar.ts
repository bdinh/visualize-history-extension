export interface TabItemProps {
    icon: string,
    label: string,
    tabItemOnClickCallback: any
}

export interface TabListProps {
    tabItemList: TabItem[],
    tabItemOnClickCallback: any

}

export interface TabItem {
    icon: string,
    label: string,
}

export interface SideNavbarProps {
    profileOverviewAvatarInitialsLabel: string,
    profileOverviewProfileName: string,
    profileOverviewProfileEmail: string,
    tabItemOnClickCallback: any,
    tabItemListPrimary: TabItem[],
    tabItemListSecondary: TabItem[]
}

export let tabItemListPrimary: TabItem[] = [
    {
        icon: "timeline",
        label: "Hour"
    },
    {
        icon: "view_day",
        label: "Day"
    },
    {
        icon: "view_week",
        label: "Week"
    },
    {
        icon: "view_module",
        label: "Month"
    },
    {
        icon: "insert_chart",
        label: "Statistics"
    },
    {
        icon: "view_comfy",
        label: "All History"
    },
];

export let tabItemListSecondary: TabItem[] = [
    {
        icon: "settings",
        label: "Setting"
    },
    {
        icon: "help",
        label: "Help & Send Feedback"
    },
    {
        icon: "attach_money",
        label: "Support"
    },
]
