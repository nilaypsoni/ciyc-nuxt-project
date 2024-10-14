import TokenService from "@/services/token.service";
import {ROUTES} from "@/utils/constants/routes";

const AuthGuard = (to,from,next,allowedRole) => {
   
  console.log("AuthGuard start");
  const isUserLoggedIn = TokenService.getUser();
  const isGuestLoggedIn = TokenService.getGuest();
  const loggedInUserRole = TokenService.getUser()?.role;

  console.log(typeof allowedRole, "allowedRole");
  console.log(to, "to");
  console.log(from, "from");
  console.log(typeof loggedInUserRole, "loggedInUserRole");

  let show = false;
  if (allowedRole === 'Organizer' && loggedInUserRole === 'Event Planner') {
    show = true;
  }

  if (allowedRole === loggedInUserRole || show) {
    return next();
  }

  next({ name: ROUTES.HOME });
}
export default AuthGuard
