import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'

export async function  getCognitoconfig(name,pass)

{   
    return new Promise((resolve, reject) => {
        var authenticationData = {
          Username: name,
          Password: pass
        }
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
          authenticationData
        )
        var poolData = {
          UserPoolId: 'ap-south-1_E01d04Nyp',
          ClientId: '6je2kjrts8m888se3qadohkq5s'
        }
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
        var cognitoUser = userPool.getCurrentUser()
  
        if (!cognitoUser) {
          var userData = {
            Username: authenticationData.Username,
            Pool: userPool
          }
          cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
  
          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
              var accessToken = result.getAccessToken().getJwtToken()
              var idToken = result.idToken.jwtToken
  
              console.log('Success', accessToken, idToken)
              resolve('ok') // Resolve the promise with "ok"
            },
            onFailure: function (err) {
              reject(err) // Reject the promise with the error
            }
          })
        } else {
          resolve('ok') // Resolve the promise with "ok" for existing authenticated users
        }
      })
}