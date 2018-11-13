import React from 'react';

const WinnerModal = (props) => {
    let additionalClasses = '';
    if (props.open) {
        additionalClasses = 'open';
    }
    return (
        <React.Fragment>
        <div className={"tf-modal " + additionalClasses} role="dialog" aria-labelledby="tfModalLabel" aria-modal="true">
            <button onClick={props.closeModal} type="button" className="close" aria-label="close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h3 id="tfModalLabel">and the winner is:</h3>
            <h2>{props.children}</h2>
        </div>
        {props.open ? 
            <div className={"tf-modal-overlay " + additionalClasses}></div>
        : null}
        </React.Fragment>
    );
}

export default WinnerModal;