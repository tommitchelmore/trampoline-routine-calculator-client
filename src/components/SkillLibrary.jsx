
import { CircularProgress, Grid, Stack, TextField, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SkillCard from './SkillCard';
import Fuse from 'fuse.js'
import { useUser } from '../store';

function SkillLibrary(props) {

  const [search, setSearch] = useState('')
  const [skills, setSkills] = useState([])
  const [initSkills, setInitSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const user = useUser(state => state.user)

  const updateSearch = (e) => {
    setSearch(e.target.value)
  }

  const getSkills = () => {
    setLoading(true)
    fetch('/api/skill')
    .then(res => res.json())
    .then(data => {
      setInitSkills(data.skills)
      setLoading(false)
    })
  }

  useEffect(() => {
    getSkills()
  }, [])

  useEffect(() => {
    const fuse = new Fuse(initSkills, {
      keys: ['name', 'description', 'start_position', 'end_position', 'difficulty', 'fig_shorthand']
    })
    setSkills(fuse.search(search).length > 0 ? fuse.search(search) : initSkills)
  }, [search,initSkills])

  const handleUpdate = () => {
    getSkills()
  }

  return (
    <Stack gap={2}>
      <TextField label="Search" onChange={updateSearch} value={search} />
      {!loading && <>
        <Grid container spacing={2}>
          {skills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <SkillCard {...(skill.item || skill)} remove={user?.role === 'admin'} onUpdate={handleUpdate} />
            </Grid>
          ))}
        </Grid>
      </>}
      {loading && <>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '24rem'}}><CircularProgress /></Box>
      </>}
    </Stack>
  );
}

export default SkillLibrary;