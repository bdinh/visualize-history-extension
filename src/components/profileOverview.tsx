import * as React from 'react';
import {
    DefaultAvatarProps, ProfileEmailProps,
    ProfileNameProps,
    ProfileOverviewProps,
    ProfilePictureProps
} from "../types/props/profileOverview";
import '../css/profileOverview.css'

export class ProfileOverview extends React.Component<ProfileOverviewProps, any> {

    render() {

        const {
            avatarInitialsLabel,
            profilePictureSrc,
            profileEmail,
            profileName
        } = this.props;


        return (
            <div className={"profile-overview-container"}>
                {
                    profilePictureSrc ?
                        <ProfilePicture
                            profilePictureSrc={profilePictureSrc}
                        /> :
                        <DefaultAvatar
                            avatarInitialsLabel={avatarInitialsLabel}
                        />
                }
                <ProfileName profileName={profileName}/>
                <ProfileEmail profileEmail={profileEmail}/>
            </div>
            );
    }
}


class ProfilePicture extends React.Component<ProfilePictureProps, any> {

    render() {
        const {
            profilePictureSrc
        } = this.props;

        return (
            <div className={"profile-picture-container"}>
                <div className={"profile-picture"}>

                <img  className={"profile-picture-img"} src={profilePictureSrc}/>
                </div>
            </div>
        );
    }
}

class DefaultAvatar extends React.Component<DefaultAvatarProps, any> {
    render() {
        const {
            avatarInitialsLabel
        } = this.props;

        return(
            <div className={"default-avatar-container"}>
                <div className={"avatar-container"}>
                    {avatarInitialsLabel}
                </div>
            </div>
        );
    }
}

class ProfileName extends React.Component<ProfileNameProps, any> {
    render() {
        const {
            profileName
        } = this.props;
        return (
            <div className={"profile-name-container"}>
                {profileName}
            </div>
        );
    }
}

class ProfileEmail extends React.Component<ProfileEmailProps, any> {

    render() {

        const {
            profileEmail
        } = this.props;

        return (
            <div className={"profile-email-container"}>
                {profileEmail}
            </div>
        )
    }
}