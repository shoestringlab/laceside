# Laces IDE
in-browser JavaScript IDE


v 2.0.12

An in-browser JavaScript Web Application IDE with live execution, console output, and application display.


***About this version***

v 2.0.11

* convert arrays to maps in handling apps and libraries.

Requirements:

* NodeJS runtime
* MariaDB server
* NGINX or other Web server

Optional
* Email address that can send messages. You can use a mail trap like PaperCut if you only need to test email capabilities.
* Additional configuration in ./index.js to serve static content through NodeJS. See previous versions of index.js for suggestions.

***Installation:***

1. Clone the GtHub repo.

2. In the console from the root folder of the project, type:

    $ npm install

3. Restore the backup of the database from the ./database folder into your MariaDB server.

4. The configuration information is located in the /config folder.
    a. Database login information is located in config/dbconfig.js. Either copy these credentials or create db credentials of your own and copy them into this file.
    b. Email server configuration information is located in config/emailconfig.js. You will need to set this information in order to send email address confirmation emails.
    c. Site configuration information is located in config/siteconfig.js. The server host can be set here and is used in the user confirmation emails as the hostname to direct the user to.
	d. A sample NGINX configuration is located here under nginx.txt. It contains all the mappings needed to serve the application and static files required for the app.


5. In the console from the root folder of the project, type:

    $ node index.js

***Changing the User Password***


*** There is now one user in the database, "rmunn", password of "password". ***
