import React, { useEffect, useState } from 'react';
import { Route, Link } from "react-router-dom";

import { Card, Image, Input, Form, Button } from 'semantic-ui-react'

import { getRepo } from './Api';

import { Details } from './Details';
import './ReposList.css';



export const ReposList = () => {
  const [repos, setRepos] = useState([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [githubName, setGithubName] = useState('');
  const [name, setName] = useState(false);

  const nameSearch = () => {
    setName(true);
  }

  const nameEnter = (event) => {
    setGithubName(event.target.value)
  }

  const onClick = (repo) => {
    localStorage.setItem('repo', JSON.stringify(repo));
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

  const options = [
    { key: 'date', text: 'sort by date', value: 'date' },
    { key: 'title', text: 'sort by title', value: 'title' },
  ]

  return (
    <>
      <Route path='/git-api' exact>
        <div className='navbar'>Github Search</div>
        <div className="ui focus input search">
          <input
            value={githubName}
            onChange={nameEnter}
            type="text"
            placeholder="Enter github name"
          />
          <Button onClick={nameSearch} primary>Search</Button>
        </div>
        {name &&
          <>
            <h1 className='title'>List of Repositories</h1>
            <Form.Field widths='equal' className='searchTitle' >
              <Input type='text' value={query} onChange={hendleOnChange} placeholder="Search by title"></Input>
              <select value={sort} onChange={reposSort} className='select'>
                <option value='date'>by date uppdate</option>
                <option value='title'>by title</option>
              </select>
            </Form.Field>
            <ul className='list-group'>
              {repos.filter(repo => repo.name.toLowerCase().includes(query.toLocaleLowerCase())).map(repo => (
                <li key={repo.id} className='list-group-item'>
                  <Card className='card'>
                    <Image src={repo.owner.avatar_url} />
                    <Card.Content>
                      <Card.Header>{`autor: ${repo.owner.login}`}</Card.Header><br />
                      <Link onClick={() => onClick(repo)} className='name' to='/details'>{`Title: ${repo.name}`}</Link>
                      <br />
                      <Card.Meta>
                        <span className='date'>{`last update: ${repo.updated_at}`}</span>
                      </Card.Meta><br />
                      <Card.Description className="description">
                        {repo.description}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <p className='rating'>{`Rating: ${repo.size}`}</p>
                    </Card.Content>
                  </Card>
                </li>
              ))}
            </ul>
          </>}
      </Route>
      <Route path='/details' component={Details}>
      </Route>
    </>
  );
}
