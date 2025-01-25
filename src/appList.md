# DevTinder APIs

## authRouter
- POST /signup   -> API for the user signUp
- POST /login    -> API for the user Login
- POST /logout   -> for the logout purpose

## profileRouter
- GET /profile/view    -> for viewing the profile
- PATCH /profile/edit  -> for editing or updating the profile
- PATCH /profile/password // Forgot password API -> for updating the profile password

## connectionRequestRouter
- POST /request/send/:status/:userId      -> for sending the request
- POST /request/review/:status/:requestId -> for reviewing the requests

## userRouter
- GET /user/requests/received  -> seeing the received requests
- GET /user/connections    -> for seeing the connections in my profile
- GET /user/feed - Gets you the profiles of other users on platform   -> getting the data for our feed


Status: ignored, interested, accepeted, rejected