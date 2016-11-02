import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

const PROJECT = (props) => {
	return (
		<div key={props.id} className="project" >
            <div className="project__body">{ReactHtmlParser(props.body)}</div>
          </div>
		)
}

export default PROJECT
