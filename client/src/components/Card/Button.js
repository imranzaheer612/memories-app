import './style.scss'
import React from 'react'


function Button({handleBack}) {
    return (
        <button className="card--button button-primary" onClick={handleBack}>
            {/* <i className="fa fa-chevron-right"></i> */}
        </button>
    )
}

export default Button