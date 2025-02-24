# create a base image for node.js 
FROM node:latest
# create a working directory

WORKDIR /app

# copy package.json file to the working directory
 COPY package.json /app

 # install the dependencies
 RUN npm install

 # copy the source code to the working directory
COPY . .
# Expose the application port
EXPOSE  3000

# start the application
CMD ["npm","start"]