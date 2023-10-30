# NIRF

## Docker Setup

#### Building images

In the root folder of the project, run the following command:
```
docker-compose build
```

#### Run containers

After the build process is done successfully, run the following:
```
docker-compose up -d
```

#### Read the logs
Now to check the logs of the frontend and the backend, open two instances of the terminal in VS Code and run the following two commands in two terminal separately:

1. ```docker-compose logs -f frontend```
2. ```docker-compose logs -f backend```
