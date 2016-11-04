import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

const _generateMarkUp = ((markup, parse = false)=>{
  if(parse){
    return ReactHtmlParser(markup)
  }else{
    return markup
  }
})


const applyClasses = (className=>{
  let _class = "post__basic"
  switch(className){
    case 'title':
    _class = ` post__${className} `
  }
  return _class
})

const applyTypes = (type=>{
  return ` post__${type} `
})

const POST = (props) => {
  //tumblr
  console.log(props);
  let _html
  switch(props.type){
    case 'photo':
    _html = (
      <div className="post__photo--wrapper">
        <img src={props.photos[0].original_size.url}></img>
        <div className="post__body  post__text post__photo--caption">{ReactHtmlParser(props.caption)}</div>
      </div>
      )
    break;
    case 'video':
    let _str = props.player[2].embed_code
    _str = _str.replace('<video', '<video controls autoplay ')
    _html = (
      <div className="post__video--wrapper">
        {_generateMarkUp(_str, true)}
        <div className="post__body  post__text post__video--caption">{ReactHtmlParser(props.summary)}</div>
      </div>
      )
    break;
    default:
    _html = _generateMarkUp(props.body,true)
    break;
  }

  return (
    <div key={props.id} className="post" >
            <div className={`post__body ${applyTypes(props.type)} ${applyClasses(props.className)} `}
            >
            {_html}
            </div>
          </div>
    )
}

export default POST
