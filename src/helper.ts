export const getCheckWordApiUrl = (word: string) =>
  `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false`;
