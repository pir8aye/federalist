import React from 'react';
import moment from "moment";

const propTypes = {
  builds: React.PropTypes.array
};

const getLastBuildTime = (builds) => {
  if (builds.length) {
    let sorted = builds.sort((a, b) => {
      let aCompletedAt = new Date(a.completedAt);
      let bCompletedAt = new Date(b.completedAt);
      return aCompletedAt > bCompletedAt;
    });
    let last = sorted.pop();
    return last.completedAt
  }
};

const getPublishedState = (builds) => {
  let lastBuildTime = getLastBuildTime(builds)
  if (lastBuildTime) {
    let formattedBuildTime = moment(lastBuildTime).format('MMMM Do YYYY, h:mm:ss a')
    return `This site was last published at ${formattedBuildTime}`;
  } else {
    return 'Please wait for the site to finish building or check the logs for a build problem.';
  }
};

const PublishedState = ({ builds = [] }) =>
  <p>
    {getPublishedState(builds)}
  </p>

PublishedState.propTypes = propTypes;

export default PublishedState;
