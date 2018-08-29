import * as React from "react";
import {SideNavbarProps, TabItemProps, TabListProps} from "../types/props/sideNavbar";
import {ProfileOverview} from "./profileOverview";


export class SideNavbar extends React.Component<SideNavbarProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {

        const {
            tabItemOnClickCallback,
            profileOverviewAvatarInitialsLabel,
            profileOverviewProfileEmail,
            profileOverviewProfileName,
            tabItemListPrimary,
            tabItemListSecondary
        } = this.props;

        return (
            <div className={"side-navbar-container"}>
                <ProfileOverview
                    avatarInitialsLabel={profileOverviewAvatarInitialsLabel}
                    profileName={profileOverviewProfileName}
                    profileEmail={profileOverviewProfileEmail}
                    // profilePictureSrc={"../src/assets/bao-profile-picture.JPG"}
                />
                <div className={"tab-item-padding"}/>
                <TabList
                    tabItemOnClickCallback={tabItemOnClickCallback}
                    tabItemList={tabItemListPrimary}/>
                <hr className={"hr-greyed"}/>
                <TabList
                    tabItemOnClickCallback={tabItemOnClickCallback}
                    tabItemList={tabItemListSecondary}/>
            </div>
            );
    }
}

class TabList extends React.Component<TabListProps, any> {
    constructor(props: any) {
        super(props);
    }

    render() {

        const {
            tabItemList,
            tabItemOnClickCallback
        } = this.props;

        return (
            <div className={"tab-list-container"}>
                {tabItemList.map((item: TabItemProps, i: number) => {
                    return (
                        <TabItem
                            tabItemOnClickCallback={tabItemOnClickCallback}
                            key={i}
                            icon={item.icon}
                            label={item.label}
                        />
                    )
                })}

            </div>

        );
    }
}


class TabItem extends React.Component<TabItemProps, any> {

    render() {
        const {
            icon,
            label,
            tabItemOnClickCallback
        } = this.props;

        return (
            <div className={"tab-item-container"} onClick={tabItemOnClickCallback}>
                <div className={"tab-item-icon-container"}>
                    <i className="material-icons tab-item-icon">{icon}</i>
                    <span className={"tab-item-label"}>{label}</span>
                </div>
            </div>
        )
    }
}
