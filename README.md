# livesandbox
in-browser JavaScript IDE

v 0.11.0

An in-browser JavaScript Web Application IDE with live execution, console output, and application display.

Requirements:

* NodeJS runtime
* MariaDB server

***Installation:***

1. Clone the GtHub repo.

2. In the console from the root folder of the project, type:

    $ npm install

3. Restore the backup of the database from the ./database folder into your MariaDB server.

4. The database login information is located in config/db.config.js. Either copy these credentials or create db credentials of your own and copy them into this file.

5. You may be required to update the stored procedures getApps and getLibraries and provide your own definer credentials if you change the login user for the datbase.

6. In the console from the root folder of the project, type:

    $ node index.js

***Changing the User Password***

Since there is as yet no admin console, if you want to change the password for the initial user, in the console from the root folder of the project, type:

    $ node hashpassword.js <password>

Copy the resulting hash and use a SQL editor to update the hash field in the users table:

    UPDATE users set hash = '<hash>' WHERE userID = 5;


Notes
------

There are a couple of example apps saved as part of the default user's account.
