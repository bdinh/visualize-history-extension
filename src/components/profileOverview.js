"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./profileOverview.css");
class ProfileOverview extends React.Component {
    render() {
        const { avatarInitialsLabel, profilePictureSrc, profileEmail, profileName } = this.props;
        return (React.createElement("div", { className: "profile-overview-container" },
            profilePictureSrc ?
                React.createElement(ProfilePicture, { profilePictureSrc: profilePictureSrc }) :
                React.createElement(DefaultAvatar, { avatarInitialsLabel: avatarInitialsLabel }),
            React.createElement(ProfileName, { profileName: profileName }),
            React.createElement(ProfileEmail, { profileEmail: profileEmail })));
    }
}
exports.ProfileOverview = ProfileOverview;
class ProfilePicture extends React.Component {
    render() {
        const { profilePictureSrc } = this.props;
        return (React.createElement("div", { className: "profile-picture-container" },
            React.createElement("img", { className: "side-navbar-profile-picture", src: profilePictureSrc })));
    }
}
class DefaultAvatar extends React.Component {
    render() {
        const { avatarInitialsLabel } = this.props;
        return (React.createElement("div", { className: "default-avatar-container" },
            React.createElement("div", { className: "avatar-container" }, avatarInitialsLabel)));
    }
}
class ProfileName extends React.Component {
    render() {
        const { profileName } = this.props;
        return (React.createElement("div", { className: "profile-name-container" }, profileName));
    }
}
class ProfileEmail extends React.Component {
    render() {
        const { profileEmail } = this.props;
        return (React.createElement("div", { className: "profile-email-container" }, profileEmail));
    }
}
