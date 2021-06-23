import React, { useEffect, useState } from 'react';

import marked from 'marked';
import DOMPurify from 'dompurify';

import { Card, Form, Input, Item, Button } from 'semantic-ui-react'


import { getReadme } from './Api';

export const Details = () => {
  const saved = JSON.parse(localStorage.getItem('repo'));
  const [readme, setReadme] = useState(null);
  const [details, setDetails] = useState(saved.description);
  const [isEditing, setIsEditing] = useState(false);
  const [readmeElement, setReadmeElement] = useState(null);

  const edit = () => {
    setIsEditing(true);
  }

  const changeText = (event) => {
    setDetails(event.target.value)
  }

  const saveText = () => {
    setIsEditing(false)
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
    const html = marked(readmeElement, { sanitize: true });
    return { __html: html };
  }

  return (
    <>
      {isEditing ?
        (
          <>
            <input placeholder='enter github name' value={details} type='text' onChange={changeText} className='edit'></input>
            <Button value={details} onClick={saveText}>save</Button>
          </>
        )
        :
        (
          <h2>
            {details}
            <Button className="button" onClick={edit}>edit</Button>
          </h2>
        )
      }<br />
      <Item className='link' as='a' href={`https://api.github.com/repos/${saved.owner.login}/${saved.name}/zipball/${saved.default_branch}`}>Download zip</Item>
      <p>Tags: one two</p>
      {readmeElement && <div dangerouslySetInnerHTML={getMarkdownText()} />}
    </>
  )
}
