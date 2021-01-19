# Quick Lookup :: Graph Viewer :: Remake / Refactoring

## App Description
This is a small plugin for Excel that displays information available in Quick Lookup.

The plugin can be run without Excel (but then some important functionality is not tested) </br>
The panel is displayed in Excel in an Iframe (See setup-video). </br>
It displays information from a simple REST API.

The panel was a part of a proof-of-concept project but now we need to start proper development of it.

## Main Objectives
* Refactor this small client application and make it robust.
* Remove EVERYTHING from the project that is not required for it to run.
* Keep all functionality 100% as is. 

## What you **CAN** change:
* Design system:
  * Project currently uses Ant Design (AntD)
* Resource Bundler:
  * Project currently uses 
* Package Manager:
  * Project currently uses Yarn
* Isomorphic abilities: (... and more)
  * Project currently uses NextJS

## What you **MUST NOT** change:
* Typescript & React 
* Isomorphic rendering 
  * Server/Client -side rendering
* Any functionality
  * Minor changes to UI / Appearance are fine
 
## What you GET:
* This codebase containing the current app/panel
  * *Create a fork for your work when you have something to commit*
* Access to a design document in Figma
  * [App Design](https://www.figma.com/file/M2dLKLSK4GH9ReQb0R2vOH/Quick-Lookup-Graph-Viewer?node-id=0%3A1)
* Access to a short video that shows you the test document setup and QL functionality
  * [Excel Test Document Setup for Quick Lookup](https://vimeo.com/501161306/656b1654c1)
* Access to a mockup API server that contains demo data
  * [REST API](https://api20210115154420.azurewebsites.net/api-docs/index.html)
  * SWAGGER UI
  * Authorize with "ql" 
* Access to an Excel document with test examples
  * *Please check your email for a link to an Exel sheet shared with you*
  * A manual setup is explained in the [Test Document in Excel](TEST_DOCUMENT.md)
* Answers to any questions you may have
  * Send questions to [stefan@quicklookup.com](mailto:stefan@quicklookup.com) / [tolli@quicklookup.com](mailto:tolli@quicklookup.com)

# Project Phases

## Phase 0
* Get everything running
* Assess the project
* Report an estimated time for the complete refactoring outlined in Phase 1
  * Look does NOT have to be pixel perfect with Figma version  
* **IMPORTANT** - Wait for an approval before continuing to Phase1

## Phase 1
* Refactor the project
* Make sure everything is functionally on par with this POC version
* Make sure to report full progress after 20 hours and commit everything you have at that time.
  * We decide on next-steps if the task is not completed at that time.
* **IMPORTANT** - Wait for an approval before continuing to Phase2

## Phase 2 :: A follow-up/optional project
* Make minor UI improvements 
  * A list of improvements will be made available once phase 1 is successfully completed
  * **IMPORTANT** - This part is estimated and timed separately at a later stage
* The 2nd Phase will be done on hourly bases, without requiering an estimate

## You will be rated on:
* The quality and design of the refactored application
* Total time spent
* How well you follow instructions
* How you report progress  
* The over-all quality of communications during the project

# Questions and Answers
Will be added here once we receive any questions.
