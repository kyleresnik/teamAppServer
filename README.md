# Table of Contents
0. [Prerequisites](#Prerequisites)
1. [About this Application](#About)
2. [Functions of this Application](#Functionality)
3. [Resources Used](#Resources)
4. [Running Hosted](#Hosted)
5. [Running Locally](#Locally)
6. [Tutorials](#Tutorials)
7. [Contact Me](#Contact)

# Prerequisites
- Code Editor Used: [Visual Studio Code](https://code.visualstudio.com/download)
- Server Program Used: [PostgreSQL](https://www.postgresql.org/download/)
- Server Viewing Program Used: [pgAdmin](https://www.pgadmin.org/download/)
- Server Testing Program Used: [Postman](https://www.getpostman.com/apps)

# About
SavePoint is a bulletin board-style web app project in which users can personally create articles alerting other users of SavePoint to cheap deals on geek-themed games in the Indianapolis area. When a user registers, they gain access to posting deals they've found in the Deals feed, as well as the ability to create a profile for their account. Other users will be able to view the deals created by other users. SavePoint's server was built out with Node.js. Express, vanilla JavaScript, and Sequelize with a PostgresQL database. Client-side, the app was created utilizing Angular 7, HTML 5, CSS 3, and more JavaScript. This project was made at Eleven Fifty Academy to simulate an authentic on-job coding sprint, as well as enforce team-based coding practices. 

# Functionality 
The SavePoint database application provides many processes for the SavePoint client, such as full CRUD functionality for two components, database associations between a user and their posts, session validation for authetnicated users, as well as roles for basic users and admin users.

# Resources 

-Eleven Fifty Node.js Server Gitbook - [Paul O'Connor](https://eleven-fifty-academy.gitbook.io/javascript-152-nodeserver/)

- JSON Web Token for Authenticated Users - [Jason Watmore](http://jasonwatmore.com/post/2018/11/22/angular-7-role-based-authorization-tutorial-with-example)

- Association Sequelization Learning - [Sequelize Docs](http://docs.sequelizejs.com/manual/tutorial/associations.html)

- Association Joining Learning - [Loren Stewart](https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/)

# Hosted
### How to run this application on the web
1. Run the [App](https://savepoint-client.herokuapp.com/).

2. Navigate to the Login Page.

3. This application runs differently depending upon user role. If you're viewing the page at a glance, then you will be able to view the home page, the about page, the login form, and the deals.

4. The signup credentials consist of first name, last name, a unique username, and password.

5. As a basic user, you can create your own personal posts and profile, as well as update and delete them. 

6. A user with admin privileges can do anything a basic user can do but also has added access to the Admin Portal page where they can view and delete from a list of users who are signed up at SavePoint.

# Locally
### How to run this Application Locally

1. Create a new folder in your preferred Code Editor (we recommend Visual Studio Code)

2. Clone the [SavePoint teamAppServer](https://github.com/jet-alone/teamAppServer) repository to the new folder you created

3. Within your Code Editor terminal, navigate into the new folder, then to "redBadgeServer" and run the following command```npm install```. This will add the folder```node_modules```to the cloned app's folder structure and will allow the server to run smoothly.

4. In the same Code Editor terminal you navigated into, run the command```nodemon app.js``` to run the server.
    
# Tutorials
### Setting up admin vs user roles

Because this application has different levels of authorization, the user model and table utilize a property alled userRole. This userRole defaults to ```basic```, but can be altered by a database manager and set to ```admin```. A user whose userRole is set to ```admin``` will gain admin privileges in SavePoint's client.
    
### Model.1 - user.js

```
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user' , {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args:5,
                    msg: "Password must be a minimum of 5 characters"
                }
            }
        },
        userRole: {
            type: DataTypes.ENUM('basic', 'admin'),
            defaultValue: 'basic'
        }
            User.associate = models => {
        User.hasMany(models['post'])
    }

    return User;
};
```
2. To set up an admin userRole with this model:
    - Open up the Postman Application and follow these steps:
    
            1. Change Request from GET to POST
            2. Next to the HTTP Request dropdwon, type: "http://localhost:3000/user/signup
            3. Navigate from Params to Body, then select "raw"
            4. In the dropdown next to raw, select "JSON (application/json)"
            5. Based on Model.1, input user information to sign up with as a JSON object
            6. Click the Send button.
            7. You should now have a user signed up to the SavePoint server!
            
    - To edit this user's role, we need to make a PUT request for the user:

            1. Next to the HTTP Request dropdwon, type: "http://localhost:3000/user/update/<id of user>
            2. Change Request from POST to PUT
            3. Copy the same JSON object you signed up with into the field
            4. For userRole, set the property's value to "admin"
            5. After pressing Send, you should set that user to an admin role!

### Database Association

This project required an association to aid in security and database management. An association is code that joins one or more database table together. In this instance we will be using a ```hasMany``` association to bind our users to posts. Within Model.1 you will see the .associate and .hasMany methods used to bind to posts.

### Model.2 - post.js

```
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post' , {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Post.associate = (models => {
        Post.belongsTo(models['user'])
    })

    return Post;
};
```
In the post.js Model.2, we use the .associate and .belongsTo methods to associate posts with users. Now when a user creates a post client-side (or even through Postman testing), that post associates to the user who created it through a foreignKey automatically generated by server-side logic. The foreignKey is generated for the post model and its value is the same as the primaryKey in the user model. This is how the database associates two tables.

### Model.3 - profile.js

```
module.exports = function(sequelize, DataTypes) {
    const Profile = sequelize.define('profile' , {
        bio: {
            type: DataTypes.STRING
        },
        twHandle: {
            type: DataTypes.STRING
        },
        fbUrl: {
            type: DataTypes.STRING
        }
    });

    return Profile;
};
```

3. Lastly, the final step to cement the database is declaring the association within our ```db.js```. 

### model.4 - db.js
```
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => {
        console.log('Successfully connected to savepoint!');
    })
    .catch(err => {
        console.error('Unable to connect to the savepoint database:', err);
    });

    const Post = sequelize.import('./models/post');

    const User = sequelize.import('./models/user');

    Post.belongsTo(User);
    User.hasMany(Post);

module.exports = sequelize;
```

# Contact
### Have a question?
### Have a request?
### Report a problem or bug?

Thank you for viewing our team-built application. We hope you found this helpful and informative. If you have any questions, feel free to e-mail me at kresnik.dev@gmail.com.