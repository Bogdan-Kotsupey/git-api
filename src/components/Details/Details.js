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

  useEffect(() => {
    if (localStorage.getItem(saved.id) && localStorage.getItem(saved.node_id)) {
      setIsEditing(localStorage.getItem(saved.id));
      setIsNotSaved(true);
      setDetails(localStorage.getItem(saved.node_id));
    }
  }, [])

  const edit = () => {
    setIsEditing(true);
    localStorage.setItem(saved.id, isEditing)
  }

  const hendleOnChange = (event) => {
    setDetails(event.target.value)
    localStorage.setItem(saved.node_id, details);
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
    getTags()
      .then(result => setTags(result))
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
            <textarea
              className={classNames('edit', { error: isNotSaved })}
              placeholder='enter github name'
              value={details}
              type='text'
              onChange={hendleOnChange}
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
      <Item className='zip' as='a' href={`https://api.github.com/repos/${saved.owner.login}/${saved.name}/zipball/${saved.default_branch}`}>Download zip</Item>
      {readmeElement && <div className='readme' dangerouslySetInnerHTML={getMarkdownText()} />}
    </section>
  )
}
