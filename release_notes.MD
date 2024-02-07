1.0.2
==================

- Updated gadget-ui library and import references.

1.0.1
===================

- Updated semver for release on npm.

1.0.0-Beta
===================

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
