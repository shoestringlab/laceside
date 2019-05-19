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
