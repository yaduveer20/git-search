import React, {useContext} from 'react';
import { GitSearchContext } from '../context/user-context';
import styled from 'styled-components';
import { GoRepo, GoGist } from 'react-icons/go';
import { FiUsers, FiUserPlus } from 'react-icons/fi'

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }

    .red {
        background: #faaaaa;
        color: #f30d0d;
      }
    .blue {
        background: #aecbf1;
        color: #4178ec;
    }

    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--clr-primary-10);
      color: var(--clr-primary-5);
    }
  }
`;


//item component
const UserDetailItem = ({label,count,icon,color})=>{
    return <article className='item'>
        <span className={color}>{icon}</span>
        <div>
            <h3>{count}</h3>
            <p>{label}</p>
        </div>
    </article>
}


const UserDetails = () => {
    const GitSearchConsumer = useContext(GitSearchContext)
    const {user} = GitSearchConsumer

    const userInfoFields = [
        {
            id: 1,
            label: 'Repos',
            count: user.public_repos,
            icon: <GoRepo className='icon'></GoRepo>,
            color: 'red'
        },
        {
            id: 2,
            label: 'Followers',
            count: user.followers,
            icon: <FiUsers className='icon'></FiUsers>,
            color: 'blue'
        },
        {
            id: 3,
            label: 'Following',
            count: user.following,
            icon: <FiUserPlus className='icon'></FiUserPlus>,
            color: 'green'
        },
        {
            id: 4,
            label: 'Gists',
            count: user.public_gists,
            icon: <GoGist className='icon'></GoGist>,
            color: 'pink'
        }
    ]

    const createUserDetailsSection = ()=>{
        return <>
            {userInfoFields.map(infoField=> <UserDetailItem key={infoField.id} {...infoField}/>)}
        </>
    } 

    return <section className='section'>
        <Wrapper className='section-center'>
                {createUserDetailsSection()}
        </Wrapper>

    </section>;
};


export default UserDetails;