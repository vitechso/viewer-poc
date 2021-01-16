# Graph Viewer 
A simple Web Application to view Quick Lookup data in Excel.

## Project Description
Please read the [Project Page](PROJECT.md) carefully!

# Startup
    
### Starting the Graph Viewer
- Make sure node and yarn are both installed (See help [here]())
- Update the project `yarn install --force`
  - You may need to delete the lockfile for the project
- Build the project `yarn build`
- Run the project in dev mode `yarn dev`
- check if the project is running by checking out the [excel panel](http://localhost:3000/excel) in a browser
  - It should show information for Reykjavik city on the page
     

### Loading the QL plugin in Excel
- Go to the [web version of Excel](https://quicklookupcom-my.sharepoint.com/) and login to Sharepoint
- Open a excel document
- Press `insert` and select `Office Add-ins`
- Select `Upload my Add-in`
- Browse to find the manifest file in this directory and load it     

### Testing the setup in a browser
- Direct Access to Exel Panel: [http://localhost:3000/excel](http://localhost:3000/excel)

### Troubleshooting
- You may need to clear the cookies/cache in your browser to get the latest version of the plugin to work


## Prerequisites
- Node
- Yarn
