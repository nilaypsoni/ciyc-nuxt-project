const getUser=()=>{
   let user=localStorage.getItem('user')
   let value=''
   if(user){
    value=JSON.parse(user)
   }
   return value
}

const setUser=(user)=>{
    if(user){
     let value=JSON.stringify(user)
     localStorage.setItem('user',value)
    }
 }


const credentialModel={getUser,setUser}
export default credentialModel