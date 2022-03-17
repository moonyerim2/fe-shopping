const fetchMatchingData = (url) => {
  fetch(url)
    .then(res => res.json())
    .then(data => data.suggestions.map(v => v.value))
};

export { fetchMatchingData };