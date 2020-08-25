import React, { Fragment } from 'react';

export default function Container(props){
    return (
        <Fragment>
            <div className="p-1 mt-1">
                <div className="navbar">
                    <div className="content-title">{ props.title }</div>
                    <div className="content-desc">{ props.desc }</div>
                </div>
                { props.children }
            </div>
        </Fragment>
    );
}