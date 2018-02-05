Steps for Phone Number Verification
{We have to add two app 
  a. Sending sms(android app)
  b. Verifying the send sms code with the phone no (webapp)
}

1. Change in the config.xml file the app name
2. Log into firebase 
3, Add Project
4. Add android app into project
5. Project overview -> Add Firebase to your android app
6. Use keytool to generate the sha1 key and 

keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
sha1
7. Register the app
8. Download the google-services.json file and put it in 
the root folder of the ionic app

9. Enable phone authentication in Authentication section of the project

10. initialize the firebase
11. Go to firebase and project explorer 
12. Add another app --> Add firebase to webapp
13. Copy the json config and initialize the firebase

3. Create new webapp -> enter the app package name
4. Authentication -> phone number
5. Copy the json


keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
