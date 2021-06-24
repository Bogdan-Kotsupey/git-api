import React, { useEffect, useState } from 'react';

import marked from 'marked';
import DOMPurify from 'dompurify';

import classNames from "classnames";

import { Item, Button } from 'semantic-ui-react'

import './Details.css';


import { getReadme } from '../Api';

export const Details = () => {
  const saved = JSON.parse(localStorage.getItem('repo'));
  const [readme, setReadme] = useState(null);
  const [details, setDetails] = useState(saved.description);
  const [isEditing, setIsEditing] = useState(false);
  const [readmeElement, setReadmeElement] = useState(null);
  const [isNotSaved, setIsNotSaved] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(saved.id) && localStorage.getItem(saved.name)) {
      setIsEditing(localStorage.getItem(saved.id));
      setIsNotSaved(true);
      setDetails(localStorage.getItem(saved.name));
    }
  }, [])

  const edit = () => {
    setIsEditing(true);
    localStorage.setItem(saved.id, isEditing)
  }

  const changeText = (event) => {
    setDetails(event.target.value)
    localStorage.setItem(saved.name, details);
  }

  const saveText = () => {
    setIsEditing(false)
    setIsNotSaved(false);
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
            <input
              className={classNames('edit', {error: isNotSaved})}
              placeholder='enter github name'
              value={details} type='text'
              onChange={changeText}
            >
            </input>
            <Button className='save-button' value={details} onClick={saveText}>save</Button>
            {isNotSaved && <p className='error-message'>you forgot to save changes</p>}
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
