import React, { useEffect, useState } from 'react';

import marked from 'marked';
import DOMPurify from 'dompurify';

import { Item, Button } from 'semantic-ui-react'

import './Details.css';


import { getReadme } from './Api';

export const Details = () => {
  const saved = JSON.parse(localStorage.getItem('repo'));
  const [readme, setReadme] = useState(null);
  const [details, setDetails] = useState(saved.description);
  const [isEditing, setIsEditing] = useState(false);
  const [readmeElement, setReadmeElement] = useState(null);
  const [isSaved, setIsSaved] = useState(true);



  const edit = () => {
    setIsEditing(true);
    setIsSaved(false);
  }

  const changeText = (event) => {
    setDetails(event.target.value)
    localStorage.setItem('details', details);
    console.log(localStorage.details)
  }

  const saveText = () => {
    setIsEditing(false)
    setIsSaved(true);
  }

  const b64_to_utf8 = (str) => decodeURIComponent(escape(window.atob(str)));

  useEffect(() => {
    getReadme(saved)
      .then(result => setReadme(result.content))
  }, []);

  useEffect(() => {
    if (readme) {
      const clean = DOMPurify.sanitize(b64_to_utf8(readme));
      setReadmeElement(clean)
    }
  }, [readme]);

  const getMarkdownText = () => {
    const html = marked(readmeElement);
    return { __html: html };
  }

  return (
    <section className='repo-container'>
      {isEditing ?
        (
          <div className='edit-container'>
            <input className='edit' placeholder='enter github name' value={details} type='text' onChange={changeText}></input>
            <Button className='save-button' value={details} onClick={saveText}>save</Button>
            <p>{isSaved ? (null) : (<p>you forgot to save changes</p>)}</p>
          </div>
        )
        :
        (
          <h2 className='repo-title'>
            {details}
            <Button className="button edit-button" onClick={edit}>edit</Button>
          </h2>
        )
      }<br />
      {readmeElement && <div className='readme' dangerouslySetInnerHTML={getMarkdownText()} />}
      <div className='tags-and-zip'>
        <p className='tags'>Tags: in progress</p>
        <Item className='link' as='a' href={`https://api.github.com/repos/${saved.owner.login}/${saved.name}/zipball/${saved.default_branch}`}>Download zip</Item>
      </div>
    </section>
  )
}
