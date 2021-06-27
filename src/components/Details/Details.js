import React, { useEffect, useState } from 'react';

import marked from 'marked';
import DOMPurify from 'dompurify';

import classNames from "classnames";

import { Item, Button } from 'semantic-ui-react'

import { getReadme, getTags } from '../Api';

import './Details.css';


export const Details = () => {
  const saved = JSON.parse(localStorage.getItem('repo'));
  const [readme, setReadme] = useState('');
  const [details, setDetails] = useState(saved.description);
  const [tags, setTags] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [readmeElement, setReadmeElement] = useState('');
  const [isNotSaved, setIsNotSaved] = useState(false);

  const edit = () => {
    setIsEditing(true);
    localStorage.setItem(saved.id, isEditing)
  }

  const saveText = () => {
    setIsEditing(false);
    setIsNotSaved(false);
    localStorage.removeItem(saved.id);
  }

  const b64_to_utf8 = (str) => decodeURIComponent(escape(window.atob(str)));

  useEffect(() => {
    if (localStorage.getItem(saved.id)) {
      setIsEditing(true);
      setIsNotSaved(true);
    }

    if(localStorage.getItem(saved.node_id)) {
      setDetails(localStorage.getItem(saved.node_id))
    }

    getTags()
    .then(result => setTags(result));

    getReadme(saved)
      .then(result => setReadme(result.content))
  }, []);

  useEffect(() => {
    if (isEditing) {
      localStorage.setItem(saved.node_id, details)
    }
  }, [details])

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
            <textarea
              className={classNames('edit', { error: isNotSaved })}
              value={details}
              type='text'
              onChange={event => setDetails(event.target.value)}
            >
            </textarea>
            <Button
              className='save-button'
              value={details}
              onClick={saveText}
            >
              save
            </Button>
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
      }
      <div className='tags-container'>
        <b>Tags:</b>
        {tags.map(tag => (
          <p className='tags' key={tag.node_id}>{tag.name}</p>
        ))}
      </div>
      <div className='link-container'>
        <Item className='zip' as='a' href={`https://api.github.com/repos/${saved.owner.login}/${saved.name}/zipball/${saved.default_branch}`}>Download zip</Item>
      </div>

      {readmeElement && <div className='readme' dangerouslySetInnerHTML={getMarkdownText()} />}
    </section>
  )
}
