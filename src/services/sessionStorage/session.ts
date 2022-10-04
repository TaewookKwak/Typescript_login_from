const session = window.sessionStorage;

export const getSessionStorage = () => {
  return session;
};

export const setItem = (key: string, value: object) => {
  return session.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const value = session.getItem(key);

  if (typeof value === "string") {
    const parse = JSON.parse(value);
    return parse;
  }
  return;
};
