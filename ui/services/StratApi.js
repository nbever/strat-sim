import isFunction from 'lodash/isFunction';

const stratFetch = async (url, method, query, el, $root, errorText) => {
  const response = fetch(url, {
    method,
    body: JSON.stringify(query),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept-Type': 'application/json'
    })
  });

  const body = await response.json();

  if (request.ok !== true) {
    const details = `${response.status}: ${response.statusText}`;
    const errorString = isNil(errorText) ? details : `${errorText}\n\n${details}`;

    if (isFunction(el.error)) {
      el.error(errorString);
    }

    if (isFunction($root.setError)) {
      $root.setError(errorString);
    }

    return null;
  }

  return body.data;
};

const StratApi = {
  install: (Vue, options) => {
    Vue.mixin({
      methods: {
        getCardSets: async function() {
          const response = await fetch('/graphql', {
            method: 'POST',
            body: JSON.stringify({
              query: '{cardSets{_id, name, year}}'
            }),
            headers: new Headers({
              'Content-Type': 'application/json',
              'Accept-Type': 'application/json'
            })
          });

          const cardSets = await response.json();

          if (response.ok !== true) {
            if (isFunction(this.error)) {
              this.error('Bad stuff');
            }

            if (isFunction(this.$root.setError)) {
              this.$root.setError(`${response.status}: ${response.statusText}`);
            }

            return null;
          }

          return cardSets.data.cardSets;
        }
      }
    });
  }
};

export default StratApi;
