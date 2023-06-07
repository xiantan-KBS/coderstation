export default [
    { path: "/issues", needLogin: false },
    { path: "/issue/:id", needLogin: false },
    { path: "/books", needLogin: false },
    { path: "/book/:id", needLogin: false },
    { path: "/interviews", needLogin: false },
    { path: "/personal", needLogin: true },
    { path: "/addissue", needLogin: true },
    { path: "/search", needLogin: false },
    { path: "/", needLogin: false },
  ];
  