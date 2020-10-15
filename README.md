## Real time chat app

### Models

1. User

- name (unique)
- password (min-length, max-length)
- room?

2. Room

- name
- messages: [{content, sender, sentTime(time stamps)}]
- users?

### Packages

- socket.io
- express
- cors
- mongoose
- express-handlebars
- connect-mongo
- passport
- mongoose-bcrypt
- passport-local

#### Dev dependencies

- nodemon
- jest

### wire frames

- home page
- sign up/log in
- chat room

### css

- bootstrap
