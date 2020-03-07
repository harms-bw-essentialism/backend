# backend

Base URL: https://essentialism2020.herokuapp.com/api/essentialism

Test user: username: Michael      password: pass

**User Endpoints**

Method | Endpoint | Description
-------|----------|------------
POST | /user/register | Registers a new user. Requires username and password
POST | /user/login | Logs in a user. Requires username and password
GET | /user | Returns a list of all users
DELETE | /user/:id | Removes user from database


**Values Endpoints**

Method | Endpoint | Description
-------|----------|------------
GET | /values | Returns a list of all values
GET | /values/:id | Returns a specific value. (id = valueId)
GET | /values/user/:id | Returns the values of a specific user. (id = id of user)
POST | values | Creates a value.
{
  valueName: string (Required),
  valueTopThree: boolean (Required),
  valueComment: string (Not Required),
  userId: integer (Required)
}
PUT | /values/:id | Edits a value. Use the above format. (id = valueId)
DELETE | /values/:id | Deletes a value. (id = valueId)


**Projects Endpoints**

Method | Endpoint | Description
-------|----------|------------
GET | /projects | Returns all projects.
GET | /projects/:id | Returns a specific project. (id = projectId)
GET | /projects/user/:id | Returns projects of a specific user. (id = id of user)
POST | /projects | Creates a project.
{
  projectName: string (Required),
  projectDescription: string (Not Required)
}
PUT | /projects/:id | Edits a value. Use the above format. (id = projectId)
DELETE | /projects/:id | Delete a project. (id = projectId)




Product Canvas: https://docs.google.com/document/d/1IttX1wn6PD-Y1n2j3CjDaIZBAIwEidgw9XWpIhTv-Ok/
