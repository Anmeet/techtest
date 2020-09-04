import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import Axios from 'axios';

const graphClient = new ApolloClient({
  uri: 'http://localhost:3500/graphql',
});

const axiosClient = Axios.create({
  baseURL: 'http://localhost:3400',
});

export const DataService = {
  // SAMPLE GraphQL Call

  getJobsWithSearchTerm: searchTerm => {
    return graphClient
      .query({
        query: gql`
          query($searchTerm: String) {
            jobs(name: $searchTerm) {
              name
              start
              end
              contact {
                id
                name
              }
            }
          }
        `,
        variables: {
          searchTerm: searchTerm,
        },
      })
      .then(result => result.data)
      .then(data => data.jobs);
  },

  //SAMPLE Normal call

  getJobs: () => {
    return axiosClient
      .get('/jobs')
      .then(result =>
        result.data.map(x => Object.assign({}, x, { id: x.id + '' }))
      );
  },

  getResources: () => {
    return axiosClient.get('/resources').then(result => result);
  },

  getActivityAllocations: () => {
    return axiosClient.get('/activityAllocations').then(result => result);
  },

  getJobAllocationsFilter: params => {
    return axiosClient
      .get('/jobAllocations', { params })
      .then(result => result);
  },

  getJobsFilter: params => {
    return axiosClient.get('/jobs', { params }).then(result => result);
  },

  getAllocatedJobs: () => {
    return axiosClient
      .get('/jobAllocations')
      .then(result =>
        result.data.map(x => Object.assign({}, x, { id: x.id + '' }))
      );
  },

  getContacts: () => {
    return axiosClient
      .get('/contacts')
      .then(result =>
        result.data.map(x => Object.assign({}, x, { id: x.id + '' }))
      );
  },

  getJobsFilteredByName: params => {
    return axiosClient
      .get('/jobs', { params })
      .then(result =>
        result.data.map(x => Object.assign({}, x, { id: x.id + '' }))
      );
  },
};
