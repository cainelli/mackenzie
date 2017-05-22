import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router-dom';
import s from '../styles/home.style';
import ProjectCard from './Home/ProjectCard';

export default function Home() {
  return (
    <div>
      <div style={s.pageLinkContainer}>
        <ProjectCard
          name="Tensorflow"
          lang="python"
          description="Simple description" 
        />
        <ProjectCard
          name="Tensorflow"
          lang="python"
          description="Simple description" 
        />
        <Interactive
          as={Link}
          {...s.link}
          to="/example"
        >Example page</Interactive>
      </div>
    </div>
  );
}
