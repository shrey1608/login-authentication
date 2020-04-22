# login-authentication

First clone the project through git clone login-authentication and then do npm install to download all the dependencies required for the project.

To start the erver just type npm start

Use Firecamp for the testing purpose

localhost:3000/api/user/register For registering user(POST)
{ 
  "name":""
	"email":"",
	"password":""
} 
In json raw


localhost:3000/api/user/login For login user (GET)
{
	"email":"",
	"password":""
}
All the validation cases have been taken care of like:
Register:
-invalid email
-password should be more than 6 letters

Login:
-If email doesnt match
-if a user exists or not
-If password doesnt match

Jwtwebtoken has also been implemented so it will generate token on logging in and can be viewed in Header as auth-token
