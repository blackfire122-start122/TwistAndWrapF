import React from "react";
import styles from "../../styles/components/registerBar.module.css";
import HomeLink from "../HomeLink";
import UserPictureLink from "../UserPictureLink";

export default function BarRegistrationFormHeader({user}) {
    return (
        <div className={styles.leftInfo}>
            <h1>Register a Bar</h1>
            <div className={styles.links}>
                <HomeLink width="75px" height="75px"/>
                <UserPictureLink user={user} width="75px" height="75px"/>
            </div>
        </div>
    );
}
