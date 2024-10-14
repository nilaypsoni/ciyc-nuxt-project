import {createToast} from "mosha-vue-toastify";


const useToaster = (type = "success",title,description,timeout=5000,customColor='') => {
    


   console.log('ae',(customColor != '') ? 'default' : type);
   if(customColor != ''){
    return createToast({title:title, description:description,timeout},
        {
            type: type,
            position:'top-center',
            timeout:timeout,
            toastBackgroundColor:'#F5F5DC',
            className:"mosha__toast toast_text_dark"
            
        }
    )
   }else{
    return createToast({title:title, description:description,timeout},
        {
            type: type,
            position:'top-center',
            timeout:timeout,
        }
    )
   }
    
 


}

export default useToaster
