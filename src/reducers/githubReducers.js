export default function reducer(state = {
  repos: [],
  selectedRepo: {
    owner: { avatar_url: '' },
  },
  branches: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    case 'FETCH_GITHUB_REPOS': {
      return { ...state, fetching: true };
    }
    default: {
      return { ...state };
    }
  }
}
