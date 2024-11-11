// plugins/router-guard.js

import { ROUTES } from '@/utils/constants/routes';

export default defineNuxtPlugin(({ app }) => {
  const router = useRouter();  // Access router
  const route = useRoute();    // Access current route

  // Add a global beforeEach route guard
  router.beforeEach((to, from, next) => {
    if (process.client) {
      // Format the route name to a readable title (e.g., "addEvents" -> "Add Events")
      const spacedStr = to?.name?.replace(/([a-z])([A-Z])/g, "$1 $2");
      const title = spacedStr
        .split(" ") // Split into words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
        .join(" "); // Join back into a string
      
      // Set the document title dynamically
      document.title = `Culture City | ${title}`;

      // Handle page scroll behavior
      let toUrl = to.fullPath.split('?')[0];
      toUrl = toUrl.split('#')[0];

      let fromUrl = from.fullPath.split('?')[0];
      fromUrl = fromUrl.split('#')[0];

      // Scroll to the top if the route changes
      if (toUrl !== fromUrl) {
        window.scrollTo(0, 0);
      }

      // Save route-specific data in localStorage
      localStorage.setItem('page-title', to.meta.title);
      localStorage.setItem('page-icon', to.meta.icon);
    }

    // Continue navigation
    if (to.name === ROUTES.ADD_EVENTS) {
      next();
    } else {
      next();
    }
  });
});
