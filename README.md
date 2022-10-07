# DMV Tennis League
This project is born out of a tennis league that I joined! Our league commissioner managed multiple levels and about 100 players using just an ongoing word document. I wanted to build an application that would automatically generate leaderboards, help with league admin tasks, be re-usable for future seasons. 

**Link to project:** https://github.com/TonyForYou/DMV-Tennis-V3 (not hosted yet)

<!-- ![alt tag](http://placecorgi.com/1200/650) -->

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Express, Mongo, DaisyUI (tailwind), Passport(authentication)

I built this using MVC architecture, MongoDB, DaisyUI, and Passport. MongoDB holds all the player, user, announcement, and match history objects. DaisyUI is used to simplify the process of making this app look good to use. Passport handles user logins!

## Optimizations
*(optional)*

This passion project is currently still under development. I can create players, create match results, store scores, release announcements. The last major piece is to tie together adding match history to the ladder points system and the associated player objects.

Performance needs to be improved. For a lightweight app it loads pretty slowly.

## Lessons Learned:

Wins - 
1. Plan your data first! I realized the complexity of the project increased when I would need to start a new season, resetting player's points. 
2. DaisyUI and tailwind documentation to help customize the off the shelf components. Little confusing at first but they've made it east for us.
3. Plan the build process. Create the model, create the route, build the ejs, build out the behavior in the controller.



## Examples:
Take a look at these couple examples that I have in my own portfolio:

**Palettable:** https://github.com/alecortega/palettable

**Twitter Battle:** https://github.com/alecortega/twitter-battle

**Patch Panel:** https://github.com/alecortega/patch-panel

# Install

`npm install`

---

# Things to add

Users to edit own information

Admin privileges - only admin can add match and add players

Logic on addMatch according to league rules. 2 points for >2 victories against the same person.

Convert to REACT - this will let me use state on the addMatch form. That way selecting 4.5 league would show players only in that league in the subsequent dropdown menus. 

---

# Run

`npm start`

# Task list
Build nav bar and footer partials - DONE
Build html for home, admin, leaderboard, player profile pages - DONE
Update models - DONE
Update routes - DONE
Update controllers - DONE
Create submit match behavior - IN PROGRESS


