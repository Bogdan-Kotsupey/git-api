import React, { useEffect, useState } from 'react';
import { Route, Link } from "react-router-dom";

import { Card, Image, Input, Form, Button } from 'semantic-ui-react'

import { getRepo } from '../Api';
import { Details } from '../Details/Details';

import './ReposList.css';


export const ReposList = () => {
  const [repos, setRepos] = useState(JSON.parse(localStorage.getItem('repos')) || []);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [githubName, setGithubName] = useState('');
  const [search, setSearch] = useState('');
  const [name, setName] = useState(false);

  const nameEnter = (event) => {
    setGithubName(event.target.value)
  }

  const nameSearch = () => {
    setSearch(githubName);
  }

  const chooseRepo = (repo) => {
    localStorage.setItem('repo', JSON.stringify(repo));
  }

  const hendleOnChange = (event) => {
    setQuery(event.target.value);
  }

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  }

  const reposSort = (event) => {
    setSort(event.target.value);
  }

  useEffect(() => {
    if (search) {
      getRepo(search)
        .then(user =>
          fetch(user.repos_url)
            .then(result => result.json())
            .then(repos => setRepos(repos))
            .then(setName(true)))
    }
  }, [search]);

  localStorage.setItem('repos', JSON.stringify(repos))

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
        <div className='navbar'>Github Search</div>
        {repos.length === 0 && (
          <div className="ui focus input search">
            <p>{JSON.parse(localStorage.getItem('repos'))}</p>
            <input
              value={githubName}
              onChange={nameEnter}
              type="text"
              placeholder="Enter github name"
            />
            <Button onClick={nameSearch} primary>Search</Button>
          </div>
        )}
        {repos.length === 0 && name && <p className='notFound'>user not found</p>}
        {repos.length > 0 &&
          <>
            <h1 className='title'>List of Repositories</h1>
            <Form.Field widths='equal' className='searchTitle' >
              <Input
                type='text'
                value={query}
                onChange={hendleOnChange}
                placeholder="Search by title"
              >
              </Input>
              <select
                value={sort}
                onChange={reposSort}
                className='select'
              >
                <option value='date'>sort by date</option>
                <option value='title'>sort by title</option>
              </select>
              <Button onClick={clearLocalStorage} primary>select another user</Button>
            </Form.Field>
            <ul className='list-group'>
              {repos.length > 0 && repos.filter(repo => repo.name.toLowerCase().includes(query.toLocaleLowerCase())).map(repo => (
                <li key={repo.id} className='list-group-item'>
                  <Card className='card'>
                    <Image src={repo.owner.avatar_url} />
                    <Card.Content>
                      <Card.Header>{`autor: ${repo.owner.login}`}</Card.Header><br />
                      <Link
                        onClick={() => chooseRepo(repo)}
                        className='name'
                        to='/details'
                      >
                        {`Title: ${repo.name}`}
                      </Link><br />
                      <Card.Meta>
                        <span className='date'>{`last update: ${repo.updated_at.replace('T', ' at ').replace('Z', '')}`}</span>
                      </Card.Meta><br />
                      <Card.Description className="description">
                        {repo.description}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <p className='rating'>{`Rating: ${repo.stargazers_count}`}</p>
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
