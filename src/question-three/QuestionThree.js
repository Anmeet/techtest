import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';

import './QuestionThree.css';

export const QuestionThree = props => {
  const [jobs, setJobs] = useState([]);
  const [allocatedJobs, setAllocatedJobs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const jobs = await props.service.getJobs();
      setJobs(jobs);

      const allocatedJobs = await props.service.getAllocatedJobs();
      setAllocatedJobs(allocatedJobs);

      // console.log(jobs)
      console.log(Date('2018-09-01T13:10:00Z'));
    }
    fetchData();
  }, []);

  const countAllocatedJobs = id => {
    const count = allocatedJobs.filter(c => c.jobId === id);
    console.log(count);
    return count.length;
  };

  return (
    <SectionGroup>
      <SectionPanel>
        <div className='first'>
          <span className='dot'></span>
          <span className='dot'></span>
          <span className='dot'></span>
          <span className='dot'></span>
        </div>

        <Header value='Header' />
        <div className='left'>
          {jobs.map(job => (
            <JobList data={job} countAllocatedJobs={countAllocatedJobs} />
          ))}
        </div>

        <div className='right'>
          <ul>
            <li class='nav-item_1'></li>
          </ul>

          <ul>
            <li class='nav-item_1'></li>
          </ul>

          <ul>
            <li class='nav-item_1'></li>
          </ul>

          <ul>
            <li class='nav-item_1'></li>
          </ul>
        </div>
      </SectionPanel>
    </SectionGroup>
  );
};

const JobList = ({ data, countAllocatedJobs }) => {
  return (
    <React.Fragment>
      <div className='header_list'>
        <ul>
          <li className='nav-item'>
            <h3>
              {data.name}
              <code>
                <a
                  href='#'
                  data-toggle='popover'
                  data-content='0'
                  data-trigger='focus'
                >
                  Job #1
                </a>{' '}
              </code>
            </h3>
            <dl>{data.location}</dl>

            <div className='text'>
              <dl>{moment(data.start).format('dddd MMM Do, YYYY')}</dl>

              <time>
                <strong>
                  {moment(data.start).format('LT')}-{' '}
                  {moment(data.end).format('LT')}
                </strong>
              </time>
              <span className='circle'>{countAllocatedJobs(data.id)}</span>
            </div>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

const Header = props => (
  <header className='header'>
    <div className='header__content'>
      <div className='header__title'>
        <h3>{props.value}</h3>
      </div>
    </div>
  </header>
);
