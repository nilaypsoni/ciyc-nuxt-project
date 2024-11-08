import { useRouter } from '#app';
import {ROUTES} from "@/utils/constants/routes";

export default ({ app }) => {
    const router = useRouter();
    // Access the router instance
    router.beforeEach((to, from, next) => {

        var toUrl = to.fullPath.split('?')[0];
        toUrl = toUrl.split('#')[0];
  
        var fromUrl = from.fullPath.split('?')[0];
         fromUrl = fromUrl.split('#')[0];

         if (process?.client) {
          
        if(toUrl  != fromUrl){
          window.scrollTo(0, 0);
         }

          localStorage.setItem('page-title',to.meta.title)
          localStorage.setItem('page-icon',to.meta.icon)
         }
  

    if(to.name == ROUTES.ADD_EVENTS){
        next();
    }else{
        // window.scrollTo(0,0)
        next()
    }
    });
  };
  