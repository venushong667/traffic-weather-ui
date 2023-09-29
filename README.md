# weather-and-traffic-app
Weather Forecast &amp; Traffic Cam Website

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
- Shadcn-ui

**Next.js** provides the features such as directory routing, server-side fetching, testing intergration, Image component on top of React. This improves the readability on the routing and the project structure, simplify the burdens to handle testing and image element. It also has more potential to further improve the project with SSR optimization, complex layout components and more.

**TailwindCSS** is a library that take CSS into variable form, which provide a standardize styling across the project and provide simple screen breakpoint and dark mode integration.

**Shadcn-ui** is a new component library that built on top of radix-ui and lucide. Compare to other component framework such as Mui, Shadcn-ui provide a very well accessibility and customization friendly that clone every components into your project `/components/ui` with their CLI. The component no longer access to `index.d.ts` only and open for any changes to provide the optimized UIUX to current project. (*Datetime picker and Data List components that used in this project is customized from other demo.*)

