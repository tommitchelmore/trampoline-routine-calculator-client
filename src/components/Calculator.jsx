import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, Grid, Paper, Button, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
import { ContentCopy, Download, Login, Print, Save } from '@mui/icons-material';
import pdf from '../util/pdf'
import React, { useEffect, useMemo, useState } from 'react';
import { useUser } from '../store';

function Calculator(props) {

  const user = useUser(state => state.user);

  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  const initSelections = useMemo(() => ({ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' }), [])
  const [selections, setSelections] = useState(initSelections)

  const difficulty = (Object.values(selections).reduce((acc, cur) => acc + (typeof cur === 'object' ? parseFloat(cur.difficulty) : 0), 0).toFixed(1))

  const handleChange = (e, index) => {
    setSelections({ ...selections, [index]: e.target.value })
  }

  const getSkillPool = (prev) => {
    if (!prev) return skills.filter(skill => skill.start_position === 'feet')
    return skills.filter(skill => skill.start_position === prev.end_position)
  }

  const copyToClipboard = () => {
    const str = Object.values(selections).filter(skill => skill !== '').map((skill,index) => `${index + 1}. ${skill.name}  |  ${skill.difficulty}  |  ${skill.fig_shorthand}`).join('\n') + '\n' + 'Generated for free at https://trampoline.tom.network'
    navigator.clipboard.writeText(str)
  }

  const getSelectionIds = () => Object.values(selections).filter(s => s !== '').map(s => s.id)

  const [copyOpen, setCopyOpen] = useState(false)
  const [pdfOpen, setPdfOpen] = useState(false)
  const handleCopyClose = () => setCopyOpen(false)
  const handlePdfClose = () => setPdfOpen(false)

  const exportPdf = () => pdf.exportPdf(Object.values(selections).filter(skill => skill !== ''))
  const printPdf = () => pdf.printPdf(Object.values(selections).filter(skill => skill !== ''))

  useEffect(() => {
    setLoading(true)
    setSelections(initSelections)
    fetch('/api/skill')
      .then(res => res.json())
      .then(data => {
        setSkills(data.skills)
        setLoading(false)
      })
  }, [initSelections])

  return (
    <>
      <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
      {!isNaN(difficulty) && difficulty > 0 &&
        <Paper elevation={4}>
          <Stack gap={2} p={4}>
            <Typography variant="h5" component="h2">
              Total difficulty: {difficulty}
            </Typography>
            <Stack>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" component="span">Skill Name</Typography>
                </Grid>
                <Grid item xs={3} textAlign="center">
                  <Typography variant="subtitle1" component="span">Difficulty/Tariff</Typography>
                </Grid>
                <Grid item xs={3} textAlign="center">
                  <Typography variant="subtitle1" component="span">FIG Shorthand</Typography>
                </Grid>
              </Grid>
              {Object.values(selections).filter(val => typeof val === 'object').map((skill, index) => 
                <Grid container key={index}>
                  <Grid item xs={6}>
                    <Typography variant="body1" component="span" color="text.secondary">
                      {index + 1}. {skill.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="center">
                    <Typography variant="body1" component="span" ml="auto" color="text.secondary">
                      {skill.difficulty}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="center">
                    <Typography variant="body1" component="span" color="text.secondary">
                      {skill.fig_shorthand}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Stack>
            <Stack direction="row" gap={2}>
              {user && <Button variant="contained" color="primary" startIcon={<Save />}>Save</Button>}
              {!user && <Button variant="contained" color="primary" startIcon={<Login />}>Log in to save</Button>}
              <Button variant="contained" color="secondary" onClick={copyToClipboard} startIcon={<ContentCopy />}>Copy to clipboard</Button>
              <Button variant="contained" color="secondary" onClick={exportPdf} startIcon={<Download />}>Download PDF</Button>
              <Button variant="contained" color="secondary" onClick={printPdf} startIcon={<Print />}>Print</Button>
              <Snackbar open={copyOpen} autoHideDuration={5000} onClose={handleCopyClose}>
                <Alert severity="success" onClose={handleCopyClose}>Copied to clipboard</Alert>
              </Snackbar>
              <Snackbar open={pdfOpen} autoHideDuration={5000} onClose={handlePdfClose}>
                <Alert severity="success" onClose={handlePdfClose}>PDF Generated</Alert>
              </Snackbar>
            </Stack>
          </Stack>
        </Paper>
      }
      <Stack gap={2}>
        <Grid container spacing={2}>
          <Grid item xs={9} md={8} lg={10} display="flex" alignItems="center">
              <Typography variant="h6" component="h3">
                Select your skills
              </Typography>
          </Grid>
          <Grid item xs={2} lg={1} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h6" component="h3">
              Tariff
            </Typography>
          </Grid>
          <Grid item xs={2} lg={1} display={{xs: 'none', md: 'flex'}} justifyContent="center" alignItems="center">
            <Typography variant="h6" component="h3">
              FIG
            </Typography>
          </Grid>
        </Grid>
        {Object.values(selections).map((selected,n) =>
          <Grid container spacing={2} key={n}>
            <Grid item xs={9} md={8} lg={10}>
              <FormControl fullWidth key={n}>
                <InputLabel id={`skill${n + 1}-label`}>{"Skill " + (n + 1)}</InputLabel>
                <Select
                  labelId={`skill${n + 1}-label`}
                  id={`skill${n + 1}`}
                  label={"Skill " + (n + 1)}
                  value={selected}
                  onChange={(e) => handleChange(e, n)}
                >
                  {getSkillPool(selections[n-1]).map((skill, idx) => <MenuItem value={skill} key={idx}>{skill.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2} lg={1} display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h6" component="div">
                {selected.difficulty}
              </Typography>
            </Grid>
            <Grid item xs={2} lg={1} display={{xs: 'none', md: 'flex'}} justifyContent="center" alignItems="center">
              <Typography variant="h6" component="div">
                {selected.fig_shorthand}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Stack>
    </>
  );
}

export default Calculator;