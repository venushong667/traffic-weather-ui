# Traffic Weather UI
Weather Forecast &amp; Traffic Cam Website

## Cautions

- Ensure your PostgreSQL and `traffic-weather-service` are up before this UI. 
If you have no local PostgreSQL server, please refer to the `docker-compose.yml` provided in the repo for easy db start up before starting any services.

- If you're not going to run development server, build the [ui image](https://github.com/venushong667/traffic-weather-ui#build-docker-image) and continue to [traffic-weather-service](https://github.com/venushong667/traffic-weather-service).

- You may experience a **slightly longer request time** for getting location list on the first time access, it is due to the cold start of service design that perform reverse geocoding for every unseen camera and store into db. The request speed would be normal after the initialize.


## Getting Started

### Run development server locally

1. Install the packages

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run production server locally

To run the production server in local, please change the `API_URL` in `next.config.js` to your local backend URL to avoid any issue.

1. Build the distribution

```bash
npm run build
```

2. Run the production server

```bash
npm run start
```

### Test

```bash
npm run cypress:open
```

### Build docker image

In the project directory, run command

```bash
docker build -t ui .
```

The docker image should start building with tag `ui:latest` locally.
After image is built, please refer to the `docker-compose.yml` provided in `traffic-weather-nest` repo for easy startup.

## Architecture

This project is make use of the following stack:
- Next.js
- TailwindCSS
- Shadcn/ui

**Next.js** provides the features such as directory routing, server-side fetching, testing intergration, Image component on top of React. This improves the readability on the routing and the project structure, simplify the burdens to handle testing and image element. It also has more potential to further improve the project with SSR optimization, complex layout components and more.

**TailwindCSS** is a library that take CSS into variable form, which provide a standardize styling across the project on the size naming ex. *sm, base, lg, xl* and provide simple screen breakpoint and dark mode integration.

**Shadcn/ui** is a new component library that built on top of radix-ui and lucide. Compare to other component framework such as Mui, Shadcn-ui provide a very well accessibility and customization friendly that clone every components into your project `/components/ui` with their CLI. The component no longer access to `index.d.ts` only and open for any changes to provide the optimized UIUX to current project. (*Datetime picker and Data List components that used in this project are customized components.*)

