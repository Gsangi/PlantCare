import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js"

var poolData = {
  UserPoolId: "ap-south-1_mhtZ1HM2Y",
  ClientId: "2odimfoqe4cddnis2iri4h82u0",
}
var userPool = new CognitoUserPool(poolData)

const SignInAuth = (username, pass) => {
  const authData = {
    Username: username,
    Password: pass,
  }
  const authDetails = new AuthenticationDetails(authData)
  const userData = {
    Username: username,
    Pool: userPool,
  }
  const cognitoUser = new CognitoUser(userData)
  return new Promise(function (resolve, reject) {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: resolve,
      onFailure: reject,
      newPasswordRequired(userAttributes) {
        console.log(userAttributes)
        cognitoUser.completeNewPasswordChallenge(
          pass,
          userAttributes,
          this
        )
      },
    })
  })
}

const SignOutAuth = (username) => {
  const userData = {
    Username: username,
    Pool: userPool,
  }
  console.log(userData)
  const cognitoUser = new CognitoUser(userData)
  cognitoUser.signOut()
  console.log("Sign Out: ", cognitoUser)
  return cognitoUser
}

export { SignInAuth, SignOutAuth }
