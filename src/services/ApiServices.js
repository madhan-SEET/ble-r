import axios from 'axios'
axios.interceptors.request.use(
    function (config) {
      config.headers = {
        Authorization: ` ${localStorage.getItem(
          `CognitoIdentityServiceProvider.6je2kjrts8m888se3qadohkq5s.${localStorage.getItem('user_name')}.idToken`
        )}`,
        Accept: 'application/json',
        'Content-Type': 'text'
      }
      return config
    },
    function (error) {
      console.log('Pre request error:', error)
      return Promise.reject(error)
    }
  )
  
  axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      console.log('Post request error:', error)
      return Promise.reject(error)
    }
  )
export async function LandingPage() {
    return new Promise((resolve,reject) => {
        axios.get(`https://nkjy2i559a.execute-api.ap-south-1.amazonaws.com/test/landing_page`)
        .then((response)=> {
            if(response)
            {
                resolve(response.data)
            }
        })
        .catch((error)=> {
            reject(error)
        })
   
    })

}