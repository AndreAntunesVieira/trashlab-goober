
# TrashLab Goober Take-Home Project

![TrashLb like Goober Logo](https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/Goober-logo.png?raw=true)


## Overview

Goober is a ride-hailing web application similar to Uber, designed to provide a seamless experience for both drivers and riders. 
The application is built using React, NextJS, Typescript, and MapboxGL. 
The backend is developed in NextJs with Prisma ORM and PostgreSQL database. 

## Getting Started

### Prerequisites
- Node.js (version specified in `package.json`)
- Yarn or NPM package manager
- a valid PostgreSQL database URL
- a valid mapbox access token

### Installation
Clone the repository and install dependencies:
```bash
git clone git@github.com:AndreAntunesVieira/trashlab-goober.git
cd trashlab-goober
yarn install
```

### Environment Setup
Configure your environment variables. Create a `.env.local` file in the root directory and update it with your local settings:

```bash
DATABASE_URL="your_database_url"
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="your_mapbox_access_token"
```
### Database Setup
If you are using a local postgres database you can run the following commands to create a tre
table structure and the next one to create a seed data for local tests.

```bash
yarn db:push
yarn db:seed
```

## Running the Application
Start the development server:
```bash
yarn dev
```
Access the application at `http://localhost:3000`.

## Building for Production
To build the application for production, run:

```bash
yarn build
```
To start the production server:

```bash
yarn start
```

## Testing

### Running Unit Tests
Run the Jest test suites:

```bash
yarn test
```
For continuous testing during development:

```bash
yarn test:watch
```

### Linting
To check for linting errors:

```bash
yarn lint
```


## Database Management
To interact with the database via Prisma Studio:

```bash
yarn db:studio
```


<hr/>


## Use instructions

There are two primary user roles in Goober:

1. **Driver**: Responsible for accepting and providing rides.
2. **Rider**: Users looking for transportation.

## Rider Interface

### Home and Login
- On accessing the Goober app, all users are prompted to login.
- After logging in, riders are redirected to the `/rider` page.
<div class="text-center" style="text-align: center">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/rider1-login.png?raw=true">
    <div>Login using default user "rider1@trashlab.com"</div>
    <div>(no password needed)</div>
</div>

### Rider Page
- The `/rider` page displays a map centered on the rider's current location.
- Below the map, there's a section featuring the Goober logo, user's name, profile picture, and a button to select a destination.
<div class="text-center" style="text-align: center">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/rider1-dashboard.png?raw=true">
    <div>Dashboard centered at user browser location</div>
</div>

### Destination Selection
- Clicking the destination button leads to the `/rider/search` page.
- This page has a back button, Goober logo, two input fields (for start and end locations), and a confirmation button.
- On selecting locations, the map shows a dark blue marker for the start and a light blue marker for the end location. The map adjusts its zoom to fit both points.
<div class="text-center" style="text-align: center">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/rider1-search.png?raw=true">
    <div>User selecting pickup and drop off location</div>
</div>

### Ride Confirmation
- The `/rider/confirm` page maintains the map view with location markers.
- It lists available drivers, with fare calculation based on availability and driver type (standard or black, with black drivers having a 1.5x fare multiplier).
- Riders see expected distance, time, and fares for each driver. They select a driver and confirm the ride.
- Dynamic price: If there is only one driver available the multiplier is "2" to represents high demand.
<div class="text-center" style="text-align: center" style="margin-bottom: 20px">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/rider1-select-driver1.png?raw=true">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/rider1-select-driver2.png?raw=true">
    <div>Rider can select between distinct drivers with different prices</div>
</div>
<div class="text-center" style="text-align: center">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/rider2-dynamic.png?raw=true">
    <div>If there are few drivers the dynamic price multiplier is by "2"</div>
</div>

### Ride Progress
- The rider is then taken to the ride page, showing a message about the ride status.
- If the driver accepts, the message updates to show the ride is in progress. If the driver declines or cancels mid-ride, the message changes accordingly.
- Riders can cancel the ride either after booking or during the ride.
<div class="text-center" style="text-align: center">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/rider1-riding-wait.png?raw=true">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/rider1-riding-accepted.png?raw=true">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/rider1-riding-canceled.png?raw=true">
</div>
 
## Driver Interface

### Home and Ride Searching
- On login, drivers are directed to the `/driver` page.
- This page displays a map with their location, Goober logo, driver's name, and image, with a message about searching for rides.

<div class="text-center" style="text-align: center">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/driver1-login.png?raw=true">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/driver1-dashboard.png?raw=true">
</div>

### Ride Requests
- When a ride request is made, drivers are automatically taken to the ride page.
- Here, they see ride details (price, dynamic fare status, origin, destination, and rider's info).
- Two buttons are available: accept and reject. Post-acceptance, the reject button changes to a cancel button.
<div class="text-center" style="text-align: center">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/driver1-confirm.png?raw=true">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/driver1-riding.png?raw=true">
    <img width="200" src="https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/prints/driver1-rider-canceled.png?raw=true">
</div>

## Technical Details

- **Frontend**: React, NextJS, Typescript
- **Map Integration**: MapboxGL
- **Backend**: NextJs
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Project Initialization**: `yarn create t3-app`
