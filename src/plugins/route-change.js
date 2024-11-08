import { useRouter,useRoute } from '#app';
import {ROUTES} from "@/utils/constants/routes";

export default ({ app }) => {
    const router = useRouter();
    const route = useRoute();
    router.beforeEach((to, from, next) => {
        
      if (process?.client) {
        const spacedStr = to?.name?.replace(/([a-z])([A-Z])/g, "$1 $2");
        const title = spacedStr
          .split(" ") // Split into words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
          .join(" "); // Join back into a string
        document.title = `Culture City | ${title}`;
      }
     

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
  