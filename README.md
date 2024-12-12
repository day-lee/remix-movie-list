# Remix Movie List

A simple project to display a list of movies using a The Movie Database(TMDB) public API.

## Setup the project locally

Follow these steps to set up the project on your local machine:

1. Clone the repository

```
git clone https://github.com/day-lee/remix-movie-list.git
```

2. Install dependancy

```
cd ih-movie-list
npm install
```

3. Create an `.env` file
   In the root of the project directory, create a file `.env`  
   add the following variables

```
VITE_API_KEY=<provided-api-key>
VITE_APP_AUTH_TOKEN=<provided-token>
```

4. Start the development server

```
npm run dev
```

## Additional Information

### Technologies Used:

- Remix (with Vite)
- TypeScript
- Tailwind CSS
- Sharp

### Features:

- Displays a list of popular movies retrieved from The Movie Database (TMDB) API.
- Shows detailed information for each movie on a separate page.
- Responsive and acceesible design for mobile and desktop devices.
