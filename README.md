# Backend

## USERS model functions
> Path is /users
* GET all users (__findAll()__)
    * takes no input, returns all users
* ADD user (__add(user)__)
    * takes a user object with name, email, city, state
    * returns user object
* FIND user by ID (__findById(id)__)
    * takes an id (integer)
    * returns first user with matching id
* FIND user by filter (__findBy(filter)__)
    * takes an id, name, city or state
    * can return more than one user
* DELETE user by ID (__remove(id)__)
    * takes an id (integer)
* UPDATE user (__update(changes, id)__)
    * takes a changes object with name, email, city, state
    * takes an id (integer) as 2nd argument
    * returns updated user

## ISSUES model functions
> Path is /issues
* GET all issues (__findAll()__)
    * takes no input, returns all issues
* ADD issue (__add(issue)__)
    * takes an issue object with title, description, city, state
    * returns an issue object
* FIND issue by ID (__findById(id)__)
    * takes an id (integer)
    * returns first issue with matching id
* FIND issue by filter (__findBy(filter)__)
    * takes an id, name, city or state
    * can return more than one issue
* DELETE issue by ID (__remove(id)__)
    * takes an id (integer)
* UPDATE issue (__update(changes, id)__)
    * takes a changes object with title, description, city, state
    * takes an id (integer) as 2nd argument
    * returns updated issue