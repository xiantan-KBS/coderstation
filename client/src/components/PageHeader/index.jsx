import React from 'react';
import styles from './index.module.css';


function PageHeader(props) {
    return (
        <div className={styles.row} style={props.style} >
            <div className={styles.pageHeader} >
                {props.title}
            </div>
            {props.children}
        </div>
    );
}

export default PageHeader;