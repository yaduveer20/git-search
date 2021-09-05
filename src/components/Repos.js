import React, {useContext} from 'react';
import styled from 'styled-components';
import { GitSearchContext} from '../context/user-context';
import { Pie3D, Column3D, Bar3D, Doughnut3D, Chart } from './charts/index.js';


const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

const Repos = () => {
    const {repos} = useContext(GitSearchContext)
    // console.log('repos', repos)
    
    //most used and starred languages
    const starsReposPerLanguage = repos.reduce((language_accum, repo)=>{
        const {language, stargazers_count: stars} = repo
        if(!language) return language_accum
        if(!language_accum[language]){
            language_accum[language] = {label: language, value: 1, stars}
        }
        else{
            language_accum[language] = {
                ...language_accum[language],
                value: language_accum[language].value+1,
                stars: language_accum[language].stars + stars
            }
        }
        return language_accum
    }
    , {})


    //sorting top five most used languages
    const mostUsedLanguages = Object.values(starsReposPerLanguage).sort((a,b)=>{
        return b.value - a.value
    }).slice(0,5)

    const mostStarredLanguages = Object.values(starsReposPerLanguage).sort((a,b)=>{
        return b.stars - a.stars
    }).slice(0,5).map(item=> {
        return {...item, value: item.stars}
    })

    
    //most starred and forked repos
    // console.log('repos', repos)
    let {stars,forks} = repos.reduce((repo_accum,repo,index)=>{
        const {name,stargazers_count: stars,forks} = repo
        
        const key = `${index}`
        repo_accum.stars = {...repo_accum.stars}
        repo_accum.stars[`${key}`] = {label: name, value: stars}

        repo_accum.forks = {...repo_accum.forks}
        repo_accum.forks[`${key}`] = {label: name, value: forks}

        return repo_accum
    },{stars: {}, forks: {}})

    stars = Object.values(stars).sort((a,b)=>{
        return b.value - a.value
    }).slice(0,5)

    forks = Object.values(forks).sort((a,b)=>{
        return b.value-a.value
    }).slice(0,5)


    return <section className='section'>
        <Wrapper className='section-center'>
            <Pie3D chartData={mostUsedLanguages} />
            <Column3D chartData={stars} />
            <Doughnut3D chartData={mostStarredLanguages} />
            <Bar3D chartData={forks} />
        </Wrapper>
        </section>;
  };

export default Repos;