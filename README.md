![logo](https://res.cloudinary.com/placeiknow/image/upload/c_scale,w_200/v1503588668/logo_shhvcy.png)
# Frontend
:us: :uk:
This is a project to move the frontend travel management platform of _Place I Know_, my part-time business, from a monolithic Ruby application designed using ERB templates to a faster, mobile-friendly React.js application. For the backend, please see [backend Node.js application](https://github.com/shaunjacobsen/place_i_know_backend_v2).

:fr:
Ce projet est pour le front-end (l'interface utilisateur) de mon entreprise à temps partiel, _Place I Know_, qui était initialement écrit en Ruby et HTML. Je souhaitais utiliser React.js pour offrir une expérience plus facile à utiliser et réactive pour mes clients. Pour le back-end, veuillez visiter [l'application back-end Node.js](https://github.com/shaunjacobsen/place_i_know_backend_v2)

---

### Objective
To separate the backend from the frontend, making it easier to manage. I chose React.js to exercise newfound front-end development skills with the aim of building a faster, more responsive frontend for my vacation planning clients, and making it easier to integrate and maintain new features for the platform.

### Objectif
J'ai voulu découpler le backend du frontend du logiciel, comme il était avec le logiciel Ruby. J'ai choisi React.js comme exercice d'appliquer mes nouvelles compétences du développement de front-end dans l'intention de construire une application plus réactive et facile à utiliser pour mes clients, et aussi de m'aider à intégrer et maintenir les nouvelles fonctionnalités.

## Demo Site / Site de démonstration
Visit [the demonstration site](http://http://placeiknow-frontend-staging.herokuapp.com/) and sign in with the following credentials:

Email: go@placeiknow.com
Password: demo2018

Please see the Feature Walkthrough below for screenshots and explanations of features.

Visitez [la site de démonstration](http://http://placeiknow-frontend-staging.herokuapp.com/) et se connecter avec les coordonnés au-dessous :

Email : go@placeiknow.com
Mot de passe : demo2018

Notez que, en ce moment, la site n'est disponible qu'en anglais.

## Technology, Integrations, & Dependencies

:us: :uk:
- **Javascript** (React.js).
- Axios for HTTP requests.
- Custom CSS (SCSS) for most components, Ant Design for some components.
- **Amazon Web Services (AWS)**
  - Uses Simple Storage Service (S3) with signed, expirable URLs to allow customers to securely download travel documents.
- **Cloudinary** for the retrieval and uploading of images, including destination photos and user avatars. A custom workflow to upload, crop, and store the images was designed for this application.
- **Mapbox GL.js** maps for showing the location of events, hotels, and more.
- **Pusher ChatKit** for integrating realtime chat with customers.
  - Customers may chat one-on-one with their travel planner, or group chat with all other travellers on their trip.
  - Includes presence indicators and realtime typing indicators.

:fr:
- **Javascript** (React.js).
- Axios pour les rêquetes HTTP.
- **Amazon Web Services (AWS)**
  - Intégration avec Simple Storage Service (S3, stockage dans le cloud) avec les URL pre-signées pourque les clients puissent télécharger leurs documents de voyage.
- **Cloudinary** pour le téléchargement des images. Un workflow customisé a été créé pour le téléchargement, recadrement, et stockage des images.
- **Mapbox GL.js** pour montrer l'emplacement des évenements, hôtels, etc. 
- **Pusher ChatKit** pour le tchat en temps réel.
  - Les clients peuvent tchatter en temps réel avec leur planificat/-eur/-rice, ou en groupe avec l'ensemble des voyageurs sur leur voyage.
  - Les indicateurs de présence et de saisie de texte y sont compris.

## Feature Walkthrough / Démonstration des fonctionnalités
#### Sign In
![Sign in page screenshot](https://res.cloudinary.com/placeiknow/image/upload/c_scale,w_775/v1527177649/demo/Sign_in.png)

#### Trip list page
![Trip list page screenshot](https://res.cloudinary.com/placeiknow/image/upload/c_scale,w_775/v1527177560/demo/Main_screen.png)
This is the landing page after sign in.

#### Trip info page
![Trip info page screenshot](https://res.cloudinary.com/placeiknow/image/upload/c_scale,w_775/v1527177641/demo/Trip_info.png)
Currently, this page shows only the other travellers on the same trip. Soon, it will include an option to add new travellers to the trip, a list of upcoming reservations and bookings, and the latest chat messages pertaining to the trip's group chat.

#### Itinerary
![Itinerary page screenshot](https://res.cloudinary.com/placeiknow/image/upload/c_scale,w_775/v1527177688/demo/Itinerary.png)
A planned itinerary is the core of the service offered. The itinerary page features a day-by-day list of events planned for the travellers. A Mapbox map is displayed for each event showing the location of highlighted events.

#### Bookings
![Hotel page screenshot](https://res.cloudinary.com/placeiknow/image/upload/c_scale,w_775/v1527177646/demo/Hotels.png)
When planning a trip, several hotel options are offered to the travellers at first. These are organized by "groups", often for the same destination. A traveller will choose the hotel they would like the travel planner to book. Upon booking confirmation, the unselected options disappear, and only the confirmed hotel is shown.

![Train page screenshot](https://res.cloudinary.com/placeiknow/image/upload/c_scale,w_775/v1527177640/demo/Train.png)
The same workflow applies for flights, train, and bus reservations. The traveller chooses the option best suited for their style and budget, and the travel planner is notified & places the booking.

#### Documents
![Documents page screenshot](https://res.cloudinary.com/placeiknow/image/upload/c_scale,w_775/v1527177640/demo/Documents.png)
Organizing all of the documents for a trip can be a difficult task. The travel planner organizes documents into "document groups". These documents are stored in AWS S3 buckets and are downloaded via a signed URL. Only the travellers on the trip are permitted to download their documents.

#### Statement
![Statement page screenshot](https://res.cloudinary.com/placeiknow/image/upload/c_scale,w_775/v1527177641/demo/Statement.png)
Keeping track of finances before travelling is important to many travellers. The statement lists every purchase the travel planner has made on behalf of their travellers.

#### Chat
![Chat page screenshot](https://res.cloudinary.com/placeiknow/image/upload/c_scale,w_775/v1527178686/demo/Chat.png)
Chatting easily with your travel planner and travel companions is essential to a great vacation. This chat is built with Pusher ChatKit and includes separate rooms, presence indicators, typing indicators, and user avatars.

#### Account management
![Account page screenshot](https://res.cloudinary.com/placeiknow/image/upload/c_scale,w_775/v1527177640/demo/Account_page.png)
Travellers can update their personal information as well as upload and crop their avatar images from this page. Soon, travellers will be able to upload information about their official documents so that the travel planner has easy and up-to-date access to this information.


# Copyright
Copyright © 2018 Shaun Jacobsen. All Rights Reserved.
You may not copy, redistribute, or otherwise use this code for any purposes, including for hobby, educational, or commercial purposes.

Copyright © 2018 Shaun Jacobsen. Tous droits réservés.
Vous n'avez pas la permission de redistribuer, copier, ou utiliser ce code pour aucune raison, y compris pour les raisons récreatives, pédagogiques, ou commerciales.