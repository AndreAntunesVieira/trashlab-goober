
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
![rider1-login.png](public%2Fprints%2Frider1-login.png)

### Rider Page
- The `/rider` page displays a map centered on the rider's current location.
- Below the map, there's a section featuring the Goober logo, user's name, profile picture, and a button to select a destination.
![rider1-dashboard.png](public%2Fprints%2Frider1-dashboard.png)

### Destination Selection
- Clicking the destination button leads to the `/rider/search` page.
- This page has a back button, Goober logo, two input fields (for start and end locations), and a confirmation button.
- On selecting locations, the map shows a dark blue marker for the start and a light blue marker for the end location. The map adjusts its zoom to fit both points.
![rider1-search.png](public%2Fprints%2Frider1-search.png)

### Ride Confirmation
- The `/rider/confirm` page maintains the map view with location markers.
- It lists available drivers, with fare calculation based on availability and driver type (standard or black, with black drivers having a 1.5x fare multiplier).
- Riders see expected distance, time, and fares for each driver. They select a driver and confirm the ride.
- Dynamic price: If there is only one driver available the multiplier is "2" to represents high demand.
![rider1-select-driver1.png](public%2Fprints%2Frider1-select-driver1.png)
![rider1-select-driver2.png](public%2Fprints%2Frider1-select-driver2.png)
![rider2-dynamic.png](public%2Fprints%2Frider2-dynamic.png)

### Ride Progress
- The rider is then taken to the ride page, showing a message about the ride status.
- If the driver accepts, the message updates to show the ride is in progress. If the driver declines or cancels mid-ride, the message changes accordingly.
- Riders can cancel the ride either after booking or during the ride.
![rider1-riding-wait.png](public%2Fprints%2Frider1-riding-wait.png)
![rider1-riding-accepted.png](public%2Fprints%2Frider1-riding-accepted.png)
![rider1-driver-canceled.png](public%2Fprints%2Frider1-driver-canceled.png)
- 
## Driver Interface

### Home and Ride Searching
- On login, drivers are directed to the `/driver` page.
- This page displays a map with their location, Goober logo, driver's name, and image, with a message about searching for rides.
![driver1-login.png](public%2Fprints%2Fdriver1-login.png)
![driver1-dashboard.png](public%2Fprints%2Fdriver1-dashboard.png)

### Ride Requests
- When a ride request is made, drivers are automatically taken to the ride page.
- Here, they see ride details (price, dynamic fare status, origin, destination, and rider's info).
- Two buttons are available: accept and reject. Post-acceptance, the reject button changes to a cancel button.
![driver1-confirm.png](public%2Fprints%2Fdriver1-confirm.png)
![driver1-riding.png](public%2Fprints%2Fdriver1-riding.png)
![driver1-rider-canceled.png](public%2Fprints%2Fdriver1-rider-canceled.png)
- 
## Technical Details

- **Frontend**: React, NextJS, Typescript
- **Map Integration**: MapboxGL
- **Backend**: NextJs
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Project Initialization**: `yarn create t3-app`

## Conclusion

Goober aims to provide a comprehensive and intuitive platform for both riders and drivers, enhancing the ride-hailing experience. The application's robust technology stack ensures reliability, efficiency, and scalability.
