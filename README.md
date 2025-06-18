# Wordel: Guess a 5-letter word in 6 guesses

Wordel is a clone of a popular Wordle game from NY Times. Built using React, TypeScript, and Vite.

[Try here!](https://wordelgame.netlify.app/)

## Features

- Built with React for a dynamic and interactive user interface.
- Utilizes TypeScript for static typing and improved code quality.
- Powered by Vite for fast development and Hot Module Replacement (HMR).
- Includes ESLint rules to maintain code consistency and quality.

## Getting Started

  To get started with Wordel, follow these steps:

1. Clone the repository to your local machine:

```shell
git clone https://github.com/valentynf/wordel
```

2. Navigate to the project directory:

```shell
cd wordel
```

3. Install the project dependencies:

```shell
npm i
```

4. Start development server:

```shell
npm run dev
```

This will launch the game in your default web browser.

## Game Rules

- You have 6 attempts to guess the secret 5-letter word.

- After each guess, the color of the tiles will change to show how close your guess was to the word:

    🟩 Green: Correct letter in the correct position.

    🟨 Yellow: Correct letter in the wrong position.

    ⬛ Gray: Letter not in the word at all.

- Only real 5-letters English words are accepted.

- Proper nouns (names, brands, etc.) are not allowed.

- You can't reuse the same row — make each guess count!

## Author

- [Valentyn](https://github.com/valentynf)

Feel free to reach out if you have any questions or suggestions!
