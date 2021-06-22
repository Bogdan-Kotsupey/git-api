import React, { useEffect, useState } from 'react';
import { getRepo } from './Api';
import './ReposList.css';
import { Route, Link } from "react-router-dom";
import { Details } from './Details';

export const ReposList = () => {
  const [repos, setRepos] = useState([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [choose, setChoose] = useState({});
  const [githubName, setGithubName] = useState('');
  const [name, setName] = useState(false);

  const nameSearch = () => {
    setName(true);
  }

  const nameEnter = (event) => {
    setGithubName(event.target.value)
  }

  const onClick = (repo) => {
    setChoose(repo);
  }

  const hendleOnChange = (event) => {
    setQuery(event.target.value);
  }

  const reposSort = (event) => {
    setSort(event.target.value);
  }

  useEffect(() => {
    getRepo(githubName)
      .then(user => user)
      .then(user =>
        fetch(user.repos_url)
          .then(result => result.json())
          .then(repos => setRepos(repos)))
  }, [githubName]);

  repos.sort((a, b) => {
    switch (sort) {
      case 'date':
        return a.updated_at.localeCompare(b.updated_at);
      case 'title':
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <>
      <Route path='/git-api' exact>
        <input placeholder="Enter github name" value={githubName} onChange={nameEnter} type="text"></input>
        <button onClick={nameSearch}>Save</button>
        {name &&
        <>
        <h1 className='title'>List of Repositories</h1>
        <input
          type='text'
          value={query}
          onChange={hendleOnChange}
        >
        </input>
        <select value={sort} onChange={reposSort}>
          <option value=''>choose filter</option>
          <option value='date'>by date uppdate</option>
          <option value='title'>by title</option>
        </select>
        <ul className='list-group'>
          {repos.filter(repo => repo.name.toLowerCase().includes(query.toLocaleLowerCase())).map(repo => (
            <li key={repo.id} className='list-group-item'>
              <div className='autor-container'>
                <p className='autor'>{`Autor: ${repo.owner.login}`}</p>
                <img className='photo' alt='autor of repo' src={repo.owner.avatar_url} />
              </div>
              <Link onClick={() => onClick(repo)} className='name' to='/details'>{`Title: ${repo.name}`}</Link>
              <p className='details'>{`Details: ${repo.description}`}</p>
              <p className='update'>{`Last uppdate: ${repo.updated_at}`}</p>
              <p className='rating'>{`Rating: ${repo.size}`}</p>
            </li>
          ))}
        </ul>
        </>}
      </Route>
      <Route path='/details'>
        <Details
          repo={choose}
        />
      </Route>
    </>
  );
}
