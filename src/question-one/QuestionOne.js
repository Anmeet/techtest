import React from 'react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';

import './QuestionOne.css';

import { useState } from 'react';

export const QuestionOne = props => {
  console.log(props);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [contacts, setContacts] = useState([]);

  const handleChange = e => {
    const val = e.target.value;
    setNotFoundMessage('');
    if (val.length > 2) {
      setJobs([]);
      setLoading(true);
      search(val.trim());
    }
  };

  const search = async name => {
    const res = await props.service.getJobsFilteredByName({ name });
    const contacts = await props.service.getContacts();
    setContacts(contacts);
    res.length > 0
      ? setJobs(res)
      : setNotFoundMessage('Sorry, No Jobs Found. Please enter valid job name');
    setLoading(false);
  };

  const filterContactById = id => {
    const filterContactNames = contacts
      .filter(c => c.id === id)
      .map(c => c.name);
    return filterContactNames.join(', ');
  };

  return (
    <SectionGroup>
      <SectionPanel>
        <form>
          <TextField
            id='outlined-basic'
            label='Job'
            variant='outlined'
            onChange={handleChange}
          />
          <div className='jobList'>
            {loading && <CircularProgress size={40} thickness={3} />}
            {jobs.length > 0 ? (
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='right'>Name</TableCell>
                    <TableCell align='right'>Start Date</TableCell>
                    <TableCell align='right'>End Date</TableCell>
                    <TableCell align='right'>Contactor Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component='th' scope='row'>
                        {row.name}
                      </TableCell>
                      <TableCell align='right'>{row.start}</TableCell>
                      <TableCell align='right'>{row.end}</TableCell>
                      <TableCell align='right'>
                        {filterContactById(row.contactId)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              ''
            )}
            <h3>{notFoundMessage}</h3>
          </div>
        </form>
      </SectionPanel>
    </SectionGroup>
  );
};
