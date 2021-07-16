import AdminNav from "../components/AdminNav";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import { getUser } from "./api/admin";
import Router, { useRouter } from "next/router";

const admin = ({ admin }) => {
  const router = useRouter();
  const [adminObj , setAdminObj] = useState(admin);

  useEffect(() => {
    if(!adminObj)
      router.push('/login');
  }, [adminObj])

  return (
    adminObj&&(<div>
      <AdminNav />
      <h2>Hi! {adminObj.username}</h2>
    </div>)
  );
};

function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);

  if (!token) {
    redirectUser(context, "/login");
  }
  const admin = await getUser(context, token);
  // console.log(admin);

  return {
    props: {
      admin: admin ? admin : null,
    },
  };
};
export default admin;
