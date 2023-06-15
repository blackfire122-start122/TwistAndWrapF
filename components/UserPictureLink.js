import React from 'react';
import styles from "../styles/components/userPictureLink.module.css";
import Link from "next/link";

const UserPictureLink = ({user, width, height}) => {
    user = null
    const pictureStyle = {
        width: width || '150px',
        height: height || '150px',
    };
    return (
        <>
            {
                user ? (
                    <Link href="/profile">
                        <img className={styles.picture} src={`http://localhost/${user.image}`} alt={user.username} style={pictureStyle} />
                    </Link>
                ) : (
                    <div className={styles.linkContainer}>
                        <Link className={styles.link} href="/login">
                            <p>Login</p>
                        </Link>
                        <Link className={styles.link} href="/register">
                            <p>Register</p>
                        </Link>
                    </div>
                )
            }
        </>
    );
};

export default UserPictureLink;
