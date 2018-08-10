# RateDash

Requirements:
Design a web application that allows employees to submit feedback toward each other's performance review.

## Solution overview

This solution is basically a React application that persists its data in local storage.    
It mainly features:
- react
- redux
- recompose
- react-router
- webpack 4
- sass

### Application structure

**/config** 
webpack configs  

**/src/assets**  
base stylesheets  
(initially planned to include .svg and images in here)  

**/src/components/common**  
common components such as modals, cards, buttons  
  
**/src/components/forms**    
forms needed to edit or add profiles(employees) and reviews  
helper functions that can be used across forms 

**/src/components/hocs**   
hocs such as enhanceWithModal 

**/src/pages**  
there are two pages: login, dashboard  

**/src/sections**  
sections in a page: reviews (renders reviews), profiles (renders employees/profiles)  

**/src/store**  
redux related files: actions, reducers, store 

## How to run 

```
npm install
npm start
```

## Application Flow

1. First, you land on a Login page.  
You can select a profile to login with.  

2. Once selected, you are routed to /dashboard.  
As an Admin, you see two tabs: reviews, employees.  
As an Employee, you see one tab: reviews.  
Clicking on sign out will take you back to the landing page.  

3. Under reviews tab as an admin, you see all the reviews.  
Clicking on a review prompts a modal with an edit form.  
Clicking on an Add button below the header prompts a modal with an add form.  

4. Under reviews tab as a employee, you see reviews where you are assigned to.  
Clicking on a review prompts a modal with an edit form.  
You can only edit the description, and not the review assignment.  

5. Under employees tab as an admin, you see all the employees.  
Clicking on an employee prompts a modal with an edit form.  
Clicking on an Add button below the header prompts a modal with an add form.  

6. There is no employees tab for a Employee user.

## Assumptions

1. An Admin can create a new Admin profile
2. An Employee can review an admin
3. An Employee can see all of his or her reviews 
4. An Employee can edit the feedbacks of his or her reviews (but not the assignment it self. E.g. editing who is being reviewed)


## Atleast 10 Improvements to be made !!! 

1. Unit tests - perhaps with Enzyme and Jest  
2. Refactor out helper methods from forms - there are some duplications in the code as one can tell  
3. Clean up markup to be more semantic - e.g. using `<form> <lengend> <label>` properly  
4. Improve error handling and rendering error messages  
5. Clean up stylesheets - although responsive, the styles could be cleaned up a bit
6. Test with more cases... (e.g. what happens when there is no profiles? Should there be a master admin who can never be deleted?)
7. Handle route changes properly. Perhaps use state on React router's history object
8. Explore webpack optimizations. Webpack 4 configurations is still quite new to me
9. Complete sorting filter feature in reviews / profiles
10. improve it to be accessible

  

