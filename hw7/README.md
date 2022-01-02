### wp1101 hw7
# ScoreCard
### React + Axios + Express + Mongoose
####  2021/11/29

## Requirements
### Basics
1. empty database and print `Database cleared` after clicking the `Clear` button
2. if { Name, Subject } doesn't exists, add name, subject, score to database and print `Adding ( Name, Subject, Score )` after input these values and click `Add`.
3. if { Name, Subject } exists, update score in database and print `Updating ( Name, Subject, Score )` after input these values and click `Add`.
4. query by name or subject according to the input. print the search results in the console. print `Name ( inputName ) is not found` if there is no results.
5. clear everything in the console after clicking `Clear`. 

### Advanced
1. Make a `Add` tab and a `Query` tab.
2. In the `Add` tab, in addition to print the updating message after clicking `Add`, also show the person's information in a table.
3. In the `Query` tab, show search results in a table.
4. make filters in the tables
5. improvements in UI/UX
   
## What I've done
1. Basic requirements

## Improvements
1. none for now
2. I'll do advance requirements in the future


## How to run the app
1. copy `.env.defaults`, rename it to `.env` and fill in the variables
2. `yarn install`  
3. `cd frontend`   
    `yarn install`   
    `yarn start`
4. open a differnet terminal    
    `cd backend`  
    `yarn install`  
    `cd ..`  (go back to `hw7`)  
    `yarn server`

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.