import React, { useState, useEffect } from 'react';

import { SectionGroup } from '../components/section/SectionGroup';
import { SectionPanel } from '../components/section/SectionPanel';

import { Swimlane } from '../components/swimlane/Swimlane';

import './QuestionTwo.css';

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date('2018-09-01T00:00:00Z');
const RANGE_END = new Date('2018-09-01T24:00:00Z');

export const QuestionTwo = props => {
  const [data, setData] = useState([
    {
      title: 'testing',
      cards: [
        {
          start: new Date('2018-09-01T02:00:00Z'),
          end: new Date('2018-09-01T24:00:00Z'),
          description: 'test',
        },
      ],
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      let outputs = [];
      const people = await props.service.getResources();

      let x = await people.data.map(async data => {
        let result = {};
        const peopleJobs = await props.service.getJobAllocationsFilter({
          resourceId: data.id,
        });

        result['title'] = data.name;
        let cards = [];
        peopleJobs.data.map(async j => {
          const jobs = await props.service.getJobsFilter({ id: j.jobId });
          //console.log(jobs.data)
          jobs.data.map(l => {
            let card = {};
            card['start'] = new Date(l.start);
            card['end'] = new Date(l.end);
            card['description'] = l.name;
            cards.push(card);
          });
          return cards;
        });
        result['cards'] = cards;

        return result;
      });

      const y = await Promise.all(x).then(results => {
        setData(results);
        console.log(results);
      });
    }
    fetchData();
  }, []);

  return (
    <SectionGroup>
      <SectionPanel>
        <Swimlane lanes={data} end={RANGE_END} start={RANGE_START} />
      </SectionPanel>
    </SectionGroup>
  );
};
