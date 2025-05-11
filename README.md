# ChoreCow
Basic Discord bot made using discord.js that sends timed chore reminders. Made as a Mother's Day gift for my mom because I know she gets frustrated with how often she has to remind her kids to do their chores.

## Summary
* Uses a MongoDB database to maintain a list of users (ie. children) and the completion status of their chores
* Has hard-coded reminders that are sent to any children who haven't completed their chores
  * Existing reminders can be adjusted and new reminders can be created
* Provides commands for modifying the list of children and for children to mark their chores as completed

## Commands
/add_child
* Takes a user (Discord user) and name (String) and adds them to the database
  * Initial completion status is set to incomplete

/remove_child
* Takes a user (Discord user) and removes them from the database

/check
* Outputs the completion status of all the children

/complete
* Updates the database to mark the author's chores as completed
