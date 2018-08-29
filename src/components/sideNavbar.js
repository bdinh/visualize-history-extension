"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const profileOverview_1 = require("./profileOverview");
class SideNavbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { tabItemOnClickCallback, profileOverviewAvatarInitialsLabel, profileOverviewProfileEmail, profileOverviewProfileName, tabItemListPrimary, tabItemListSecondary } = this.props;
        return (React.createElement("div", { className: "side-navbar-container" },
            React.createElement(profileOverview_1.ProfileOverview, { avatarInitialsLabel: profileOverviewAvatarInitialsLabel, profileName: profileOverviewProfileName, profileEmail: profileOverviewProfileEmail }),
            React.createElement("div", { className: "tab-item-padding" }),
            React.createElement(TabList, { tabItemOnClickCallback: tabItemOnClickCallback, tabItemList: tabItemListPrimary }),
            React.createElement("hr", { className: "hr-greyed" }),
            React.createElement(TabList, { tabItemOnClickCallback: tabItemOnClickCallback, tabItemList: tabItemListSecondary })));
    }
}
exports.SideNavbar = SideNavbar;
class TabList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { tabItemList, tabItemOnClickCallback } = this.props;
        return (React.createElement("div", { className: "tab-list-container" }, tabItemList.map((item, i) => {
            return (React.createElement(TabItem, { tabItemOnClickCallback: tabItemOnClickCallback, key: i, icon: item.icon, label: item.label }));
        })));
    }
}
class TabItem extends React.Component {
    render() {
        const { icon, label, tabItemOnClickCallback } = this.props;
        return (React.createElement("div", { className: "tab-item-container", onClick: tabItemOnClickCallback },
            React.createElement("div", { className: "tab-item-icon-container" },
                React.createElement("i", { className: "material-icons tab-item-icon" }, icon),
                React.createElement("span", { className: "tab-item-label" }, label))));
    }
}
