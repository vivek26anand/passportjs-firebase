# Auth Microservice With Firebase Admin SDK and Passport-js custom strategy

## API Workflow

Step 1. get idToken ( different from uid [read more](https://firebase.google.com/docs/auth/admin/verify-id-tokens) ) from the frontend 
- for Web sdk
```
firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
  // Send token to your backend via HTTPS
  // ...
}).catch(function(error) {
  // Handle error
});
```
- for Flutter sdk
```
FirebaseAuth.instance.currentUser().then(user => {
        if (user != null) {
           user.getIdToken().then(token => {
             //handle token
           }
        }
});
```
Step 2. POST idToken to /user/verify/ endpoint
With Body
```
{
    "idToken":"ID_TOKEN_FROM_FIREBASE_SDK"
}
```
Response Returns bearer token to use for other endpoints

Step 3. Get User Profile 

GET /secure/profile 
AUTHORIZATION Bearer Token from Step 2

Response Gives User Profile


## Setup

- Rename .env.example to .env
- set port and JWT_SECRETE in .env
- get serviceAccount json file from firebase dashboard
    ````
    // To generate a private key file for your service account:

    // In the Firebase console, open Settings > Service Accounts.

    // Click Generate New Private Key, then confirm by clicking Generate Key.

    // Securely store the JSON file containing the key.
- replace serviceAccountExample.json


## Test LOGIN UI

- Replace config in ./tests/index.html to get idToken
