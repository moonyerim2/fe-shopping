/* eslint-disable arrow-parens */
/* eslint-disable import/prefer-default-export */
const fetchMatchingData = url => fetch(url)
  .then(res => res.json())
  .then(data => data.suggestions.map(v => v.value));

export { fetchMatchingData };
