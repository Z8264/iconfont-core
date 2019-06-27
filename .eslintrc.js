module.exports = {
  root: true,
  extends: "airbnb-base",
  parser: "babel-eslint",
  env: {
    es6: true,
    node: true,
    browser: true
  },
  rules: {
    "no-console": process.env.NODE_ENV !== "production" ? 0 : 2
  }
};

