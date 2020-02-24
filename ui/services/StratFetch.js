import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';

const sFetch = async (url, method, query, el, $root, errorText = 'Unknown Error') => {

  $root.setLoading(true);

  const response = await fetch(url, {
    method,
    body: JSON.stringify(query),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept-Type': 'application/json'
    })
  });

  const body = await response.json();

  $root.setLoading(false);

  if (response.ok !== true) {
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

const toQL = (obj) => {
  const string = Object.entries(obj)
    .map(([key, value]) => {
      return `${key}:${JSON.stringify(value)}`;
    })
    .join(',');

  return `{${string}}`;
}

export {sFetch, toQL};