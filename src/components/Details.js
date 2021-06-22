import marked from 'marked';
import React, { useEffect, useState } from 'react';
import { getReadme } from './Api';

export const Details = ({ repo }) => {
  const [readme, setReadme] = useState({});
  const [details, setDetails] = useState(repo.description);
  const [isEditing, setIsEditing] = useState(false);

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

  useEffect(() => {
    getReadme(repo)
      .then(result => setReadme(result.content))
  }, []);

  return (
    <>
      {isEditing ? (<><input autofocus value={details} type='text' onChange={changeText}></input> <button value={details} onClick={saveText}>save</button></>) : (<p>
        {details}
        <button onClick={edit}>edit</button>
      </p>)}
      <p>Tags:</p>
      {/* <div id="content">{b64_to_utf8(readme)}</div>
      <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
      <script>
        {document.getElementById('content').innerHTML =
        marked('README.md')}
      </script> */}
      {/* <pre>{b64_to_utf8(readme)}</pre> */}
      <a href={`https://api.github.com/repos/${repo.owner.login}/${repo.name}/zipball/${repo.default_branch}`}>Download zip</a><br />
    </>
  )
}
