# pull official base image
FROM node:17-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /
COPY package-lock.json /
RUN npm install --force
#RUN npm install react-scripts@3.4.1 -g --silent



# add app
COPY . ./


# start app
#CMD ["npm", "start"]
#CMD ["npm", "run","build"]
#CMD ["serve", "-s","build"]
RUN npm run build --production
# In your Dockerfile.
RUN npm install -g serve
# Run serve when the image is run.
CMD serve -s build -l 3030
# Let Docker know about the port that serve runs on.

EXPOSE 3030

