import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
    const alertContext = useContext(AlertContext);

    const { alert } = alertContext;

    return (
        alert!= null && (
            <div className={`alert alert-${alert.type}`} >
                <i className="fas fa-info-circle"></i><span style={{ marginLeft: "5px" }} >{alert.msg}</span>
            </div>
        )
    )
}

export default Alert;