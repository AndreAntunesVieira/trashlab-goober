
# TrashLab Goober Take-Home Project
![TrashLb like Goober Logo](https://github.com/andreantunesvieira/trashlab-goober/blob/main/public/Goober-logo.png?raw=true)


## Overview

Goober is a ride-hailing web application similar to Uber, designed to provide a seamless experience for both drivers and riders. 
The application is built using React, NextJS, Typescript, and MapboxGL. 
The backend is developed in NextJs with Prisma ORM and PostgreSQL database. 
This project was initiated using the command `yarn create t3-app`.

## User Types

There are two primary user roles in Goober:

1. **Driver**: Responsible for accepting and providing rides.
2. **Rider**: Users looking for transportation.

## Rider Interface

### Home and Login
- On accessing the Goober app, all users are prompted to login.
- After logging in, riders are redirected to the `/rider` page.

### Rider Page
- The `/rider` page displays a map centered on the rider's current location.
- Below the map, there's a section featuring the Goober logo, user's name, profile picture, and a button to select a destination.

### Destination Selection
- Clicking the destination button leads to the `/rider/search` page.
- This page has a back button, Goober logo, two input fields (for start and end locations), and a confirmation button.
- On selecting locations, the map shows a dark blue marker for the start and a light blue marker for the end location. The map adjusts its zoom to fit both points.

### Ride Confirmation
- The `/rider/confirm` page maintains the map view with location markers.
- It lists available drivers, with fare calculation based on availability and driver type (standard or black, with black drivers having a 1.5x fare multiplier).
- Riders see expected distance, time, and fares for each driver. They select a driver and confirm the ride.

### Ride Progress
- The rider is then taken to the ride page, showing a message about the ride status.
- If the driver accepts, the message updates to show the ride is in progress. If the driver declines or cancels mid-ride, the message changes accordingly.
- Riders can cancel the ride either after booking or during the ride.

## Driver Interface

### Home and Ride Searching
- On login, drivers are directed to the `/driver` page.
- This page displays a map with their location, Goober logo, driver's name, and image, with a message about searching for rides.

### Ride Requests
- When a ride request is made, drivers are automatically taken to the ride page.
- Here, they see ride details (price, dynamic fare status, origin, destination, and rider's info).
- Two buttons are available: accept and reject. Post-acceptance, the reject button changes to a cancel button.

## Technical Details

- **Frontend**: React, NextJS, Typescript
- **Map Integration**: MapboxGL
- **Backend**: NextJs
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Project Initialization**: `yarn create t3-app`

## Conclusion

Goober aims to provide a comprehensive and intuitive platform for both riders and drivers, enhancing the ride-hailing experience. The application's robust technology stack ensures reliability, efficiency, and scalability.
