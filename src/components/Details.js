import marked from 'marked';
import React, { useEffect, useState } from 'react';
import { getReadme } from './Api';

export const Details = () => {
  const saved = JSON.parse(localStorage.getItem('repo'));
  const [readme, setReadme] = useState(null);
  const [details, setDetails] = useState(saved.description);
  const [isEditing, setIsEditing] = useState(false);
  // const [readmeElement, setReadmeElement] = useState(null);

  // console.log(JSON.parse(localStorage.getItem('repo')))
  // console.log(1)
  // console.log(readme)

  const edit = () => {
    setIsEditing(true);
  }

  const changeText = (event) => {
    setDetails(event.target.value)
  }

  const saveText = (event) => {
    setDetails(event.target.value)
    setIsEditing(false)
  }

  const b64_to_utf8 = (str) => decodeURIComponent(escape(window.atob(str)));

  // if (readme) {
  //   setReadmeElement(<div>{b64_to_utf8(readme)}</div>)
  // }

  //   const  b64DecodeUnicode = (str) => {
  //     // Going backwards: from bytestream, to percent-encoding, to original string.
  //     return decodeURIComponent(atob(str).split('').map(function(c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //     }).join(''));
  // }

  useEffect(() => {
    getReadme(saved)
      .then(result => setReadme((result.content)))
  }, []);

  return (
    <>
      {isEditing ? (<><input placeholder='enter github name' value={details} type='text' onChange={changeText}></input> <button value={details} onClick={saveText}>save</button></>) : (<p>
        {details}
        <button onClick={edit}>edit</button>
      </p>)}
      <p>Tags:</p>
      {/* {readmeElement &&
        <>
          {readmeElement, console.log(readmeElement)}
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
          {readmeElement.innerHTML = marked('README.md')}
        </>
      } */}
      {readme && <pre>{b64_to_utf8(readme)}</pre>}
      <a href={`https://api.github.com/repos/${saved.owner.login}/${saved.name}/zipball/${saved.default_branch}`}>Download zip</a><br />
    </>
  )
}
