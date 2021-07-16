import { destroyCookie } from "nookies";

export async function getUser(context, token) {
  const res = await fetch("https://newleka.herokuapp.com/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if(!res.ok) {
      destroyCookie(context, "token");
      return null;
  } 

  const user = await res.json();
  
  return user;
}
