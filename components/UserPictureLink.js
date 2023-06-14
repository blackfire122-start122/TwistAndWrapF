import React from 'react';
import styles from "../styles/components/userPictureLink.module.css";
import Link from "next/link";

const UserPictureLink = ({user, width, height}) => {
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
                    <>
                        <Link href="/login">
                            <p>Login</p>
                        </Link>
                        <Link href="/register">
                            <p>Register</p>
                        </Link>
                    </>
                )
            }
        </>
    );
};

export default UserPictureLink;
