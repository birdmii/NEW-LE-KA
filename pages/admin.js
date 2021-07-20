import AdminNav from "../components/AdminNav";
import adminStyle from "../styles/Admin.module.css";
import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import { getUser } from "./api/admin";
import Router, { useRouter } from "next/router";
import { editAlert, getAlert } from "./api/newsletter";

const getAllNewsletters = async (token) => {
  const res = await fetch("https://newleka.herokuapp.com/alerts/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const admin = ({ admin, token, alert }) => {
  const router = useRouter();
  const [adminObj, setAdminObj] = useState(admin);
  const [searchText, setSearchText] = useState("");
  const [alertMsg, setAlertMsg] = useState(alert.content);
  const [isEdit, setEditMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!adminObj) router.push("/login");
  }, [adminObj]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await getAllNewsletters(token);
    } catch (error) {}
  };

  const handleLogout = () => {
    setAdminObj(null);
  };

  const handleEditBtnClick = () => {
    if (isEdit) setAlertMsg(alert.content);

    setEditMode(!isEdit);
  };

  const handleSaveBtnClick = async () => {
    const result = await editAlert(alert.id, alertMsg, token);
    if (result === 200) {
      setEditMode(!isEdit);
    } else {
      setErrorMsg('[Edit Alert Message] ⚠️ Something went wrong!!!')
    }
  };

  return (
    adminObj && (
      <div>
        <AdminNav handleLogout={handleLogout} />
        <div className={`container`}>
          <div className={`flex flex-vertical-center`}>
            <h3 className={`mt-24 mb-24`}>Welcome, {adminObj.username} 🐥</h3>
            {errorMsg&&<div className={`ml-10 ${adminStyle["errorPanel"]}`}>{errorMsg}</div>}
          </div>
          <div className={`${adminStyle["panel"]}`}>
            <h4 className={`subtitle bold mb-8`}>Alert Message</h4>
            <div className={`flex`}>
              {isEdit ? (
                <input
                  value={alertMsg}
                  className={`${adminStyle["editInput"]}`}
                  onChange={(e) => {
                    setAlertMsg(e.target.value);
                  }}
                />
              ) : (
                <span>{alertMsg}</span>
              )}
              <button
                className={`ml-10 ${adminStyle["editBtn"]}`}
                onClick={() => {
                  handleEditBtnClick();
                }}
              >
                {isEdit ? "Cancel" : "Edit"}
              </button>
              {isEdit && (
                <button
                  className={`ml-10 ${adminStyle["editBtn"]}`}
                  onClick={() => {
                    handleSaveBtnClick();
                  }}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
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

  const alert = await getAlert();

  return {
    props: {
      admin: admin ? admin : null,
      token: admin ? token : null,
      alert,
    },
  };
};
export default admin;
