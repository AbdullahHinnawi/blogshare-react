let baseUrl = '';
if(process.env.NODE_ENV === 'production'){
  baseUrl = 'https://blogshare-app.herokuapp.com'
}else{
  baseUrl = 'http://localhost:3000'
}
 export default baseUrl;