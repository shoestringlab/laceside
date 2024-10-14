v 2.0.5
=================


Bug fixes for new app creation, user creation.


v 2.0.1
=================

- Fixes the download button so you can download any JS app. The app is downloaded as a .zip archive with these files:
    - app.js - JavaScript code
	- app.css - CSS code
	- app.html - HTML code
	- index.html - the assembled web page, including any external libraries referenced. 

- Enables opening the application directly to a JS app.
- Adds a new database dump for the application.

v 2.0.0-release 
==================

Cleans up the code overhaul started for 2.0.0. 

- URL routes have been cleaned up and divided between open and secured (logged in) routes,
- The application now does a better job of not sending sensitive data back to the client, even on secured routes.
- Over application flow has been simplified and  standardized.
- The application has been re-worked to be access through a web server proxy. 



2.0.0-beta
==================

userHome is being made into the start of the workflow for creating applications. This process is on-going.

This release may not be stable.


2.0.0-alpha
==================
- Replacement of bcrypt with built-in crypto package for passwords
	 - Please use reset password function to reset user passwords
- Bug fixes
- Continued development of userHome
- Clean up of homepage with screenshots of the application
- Password reset has been fixed
- New user creation in process


1.1.0
==================

- CodeMirror 6 implementation
- Made the sidebar collapsed by default, absolute positioned, and on a different z-index than the editor and sandbox divs
- General cleanup of code
- bug fix on attaching libraries to apps failing 

1.0.5
==================
- Code cleanup
- Fixed bug in auth token creation expiration time

1.0.4
==================

- Changed conventions for view components to js/view
- Change convention for events to js/event

1.0.3
==================

- Update user/pass data to make it clear these values must be changed by the implementor.

1.0.2
==================

- Updated gadget-ui library and import references.

1.0.1
===================

- Updated semver for release on npm.

1.0.0-Beta
===================

Whew! Big release, as this is the initial beta candidate for 1.0.0 release. Missing functions like changing your password, resetting a lost password, and a cleanup of route-based security and client-side routing are the most important changes for this release. While the application should be considered feature complete, if you wish to run it in production as a public site, you may want to put the application behind NGINX, Apache HTTPD or another web server. The static files could be served by the web server rather than NodeJS, which will require some minimal re-configuration.

- Forgot password
- Reset password
- cleanup of route-based security
- cleanup of client-side routing
- new database dump

0.15.0 Beta Release
===================

- This release migrates all existing IDs to cuids.
- Many bug fixes
- Completion of new account creation code
- Email address confirmation

0.14.0 Beta Release
===================

This release migrates the repository to Shoestring Lab and renames the repository to laceside.


0.13.0 Beta Release
===================

Updates in this release:

- client-side routing via new altseven module
- bookmarking of user sites and apps
- multi-user support

- Note that this release is a work in progress. New account creation in the IDE is not yet complete, and there are other functional issues.

0.12.0 Beta Release
===================

Updates in this release:

- Add profile picture, menu in header right to access profile
- Profile page to update profile pic and personal info
- Logout

0.11.0 Beta update
===================

Updates in this release:

- add notifications on save and delete of apps and libraries
- add confirmation dialogs when abandoning changes in apps and libraries
- update database to change JS, CSS, and HTML fields to text from varchar to accommodate larger projects
- update to altseven remote module to return promises from invoked remote methods so promises can be handled from calling code

0.10.0 Beta update
===================

Updates in this release.

- update editor size when viewport size changes
  ( not finished )
- add paging to apps and libraries display
- remove old style blocks on sandbox execute
- return all apps and libraries from remote and page on client-side
- fix delete libraries server-side code bug
- add update to librariesdao
- remove getApps and getLibraries stored procs from use

0.9.4 Beta update
===================

Updates in this release.
- fix update/read issues with saving apps
- change editor layout
- fix sometimes incorrect saving of esModule bit field
- fix save/retrieval/loading of app libraries
- add getApps and getLibraries stored procs to git
- update db dump
- set editor to wrap long lines so the editor width does not grow beyond 50% of sandbox width

Upgrading from previous releases:

In addition to pulling the latest master (or the 0.9.4 tag) from GitHub, you will need to update the getApps stored procedure in the database. A SQL script has been added to ./database/getApps.sql with the updated stored procedure code. You can, if you prefer, simply replace the previous database with the new backup in the ./database folder.


0.9.3 Beta update
===================

Fixes in this release
- properly set editor mode for each pane so code renders correctly
- set editor to refresh on content load
- prevent save for unnamed apps/libraries
- resolve issues with saving/loading of libraries linked to apps
- add new library function
- fix issue with bit value as Buffer in remote/app.update
-login now loads libraries and apps


0.9.0 Beta Release
===================

The application is mostly functional, however this is a beta release and there are some significant issues with the code.

- When you load a saved app, the HTML and CSS editors will initially appear blank until you click into the editor area. The code, if any, saved in these tabs will then appear.

- When you login, the results of the database calls to retrieve libraries and apps may be cached and will not show any results. Reload the page to see the correct output.

- The editor component needs significant work to improve the editing experience.
  - The editor may grow vertically beyond the intended size of the grid area set for it.
  - The editor may not color code as intended.

- The grid layout for the sandbox and nested areas needs improvement.

- You can save a blank library entry.

- You can save a blank app entry.

- There are no confirmation/warning dialogs anywhere in the application.

- Apps and libraries are set to retrieve paged sets of records, but there is no facility in the UI to display pages at this time. Paging has been set to 100 records as a short-term measure.

- Saving apps and libraries may not work, and the remote code may not correctly handle exceptions. Reload the page to restore to the last saved state.
