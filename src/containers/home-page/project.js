import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

const PROJECT = (props) => {
	return (
		<div key={props.id} className="project" >
            <a className="project__title home__link"href={`${process.env.APP_HOST}${props.href}`}>
                <img className="project__image" src={`${process.env.REMOTE_ASSETS_DIR}${props.id}/output.gif`}></img>
            </a>
            <div className="project__title">{props.projectName}</div>
            <div className="project__desc">{ReactHtmlParser(props.projectDesc)}</div>
            <div className="project__desc">{props.projectNote}</div>
          </div>
		)
}

export default PROJECT
