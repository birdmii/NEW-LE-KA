import AdminNav from "../components/AdminNav";
import adminStyle from "../styles/Admin.module.css";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { parseCookies } from "nookies";
import { getUser } from "./api/admin";
import Router, { useRouter } from "next/router";
import {
  deleteNewsletterItem,
  editAlert,
  getAlert,
  getAllNewsletter,
} from "./api/newsletter";
import Card from "../components/Card";

const fetcher = (url) => fetch(url).then((res) => res.json());

const admin = ({ admin, token, alert, newsletters }) => {
  const router = useRouter();
  const [adminObj, setAdminObj] = useState(admin);
  const [searchText, setSearchText] = useState("");
  const [alertMsg, setAlertMsg] = useState(alert.content);
  const [isEdit, setEditMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedId, setNewsletterId] = useState();
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}newsletters?_limit=-1&_sort=id:asc`,
    fetcher
  );

  useEffect(() => {
    if (!adminObj) router.push("/login");
  }, [adminObj]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(searchText);
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  }

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
      setErrorMsg("[Edit Alert Message] ⚠️ Something went wrong :(");
    }
  };

  const handleNewsletterItem = (e) => {
    setNewsletterId(parseInt(e.target.id));
  };

  const handleDeleteBtnClick = async (e) => {
    const targetId = e.target.id;
    const deleteConfirm = confirm("Are you sure?");
    if (!deleteConfirm) {
      return false;
    }
    const result = await deleteNewsletterItem(targetId, token);
    console.log(result);
    if (result === 200) {
      data.filter((item) => item.id !== targetId);
    } else {
      setErrorMsg("[Delete Newsletter] ⚠️ Something went wrong :(");
    }
  };

  return (
    adminObj && (
      <div>
        <AdminNav handleLogout={handleLogout} />
        <div className={`container`}>
          <div className={`flex flex-vertical-center`}>
            <h3 className={`mt-24 mb-24`}>Welcome, {adminObj.username} 🐥</h3>
            {errorMsg && (
              <div className={`ml-10 ${adminStyle["errorPanel"]}`}>
                {errorMsg}
              </div>
            )}
          </div>
          <div className={`mb-24 ${adminStyle["panel"]}`}>
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
                className={`ml-10 ${adminStyle["btn"]}`}
                onClick={() => {
                  handleEditBtnClick();
                }}
              >
                {isEdit ? "Cancel" : "Edit"}
              </button>
              {isEdit && (
                <button
                  className={`ml-10 ${adminStyle["btn"]}`}
                  onClick={() => {
                    handleSaveBtnClick();
                  }}
                >
                  Save
                </button>
              )}
            </div>
          </div>

          <div className={`flex`}>
            <div
              className={`mr-24 ${adminStyle["panel"]} ${adminStyle["newsletterPanel"]}`}
            >
              <div className={`${adminStyle["newsletterItem"]}`}>
                <h4 className={`subtitle bold mb-8`}>Newsletter List</h4>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <input
                    type="text"
                    value={searchText}
                    className={`${adminStyle['searchInput']}`}
                    onChange={(e) => handleSearchText(e)}
                  />
                  <button type="submit" className={`${adminStyle["searchBtn"]}`}>
                    Search
                  </button>
                </form>
              </div>
              <ul className={`${adminStyle["newsletterList"]}`}>
                {data ? (
                  data.map((newsletter) => (
                    <li
                      key={newsletter.id}
                      className={`mb-8 ${adminStyle["newsletterItem"]}`}
                    >
                      <span
                        id={newsletter.id}
                        onClick={(e) => handleNewsletterItem(e)}
                      >
                        {newsletter.title}
                      </span>
                      <button
                        className={`ml-10 ${adminStyle["btn"]}`}
                        id={newsletter.id}
                        onClick={(e) => {
                          handleDeleteBtnClick(e);
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))
                ) : (
                  <span className={`flex-center`}>Loading</span>
                )}
              </ul>
            </div>
            <div
              className={`${adminStyle["panel"]} ${adminStyle["newsletterPanel"]}`}
            >
              <h4 className={`subtitle bold mb-8`}>Newsletter Item</h4>
              {selectedId ? (
                <Card newsletter={data[selectedId - 1]} />
              ) : (
                <div className={`flex-center`}>No item has been selected</div>
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
