import AdminNav from "../components/AdminNav";
import adminStyle from "../styles/Admin.module.css";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { parseCookies } from "nookies";
import { getUser } from "./api/user";
import Router, { useRouter } from "next/router";
import { deleteNewsletterItem, editAlert, getAlert } from "./api/newsletter";
import Card from "../components/Card";
import NewsletterForm from "../components/NewsletterForm";

const fetcher = (url) => fetch(url).then((res) => res.json());

const admin = ({ admin, token, alert }) => {
  const router = useRouter();
  const [adminObj, setAdminObj] = useState(admin);
  const [searchText, setSearchText] = useState("");
  const [alertMsg, setAlertMsg] = useState(alert.content);
  const [isEditingAlert, setAlertEditMode] = useState(false);
  const [isEditingNewsltr, setNewsltrEditMode] = useState(false);
  const [msg, setMsg] = useState({ type: "", msg: "" });
  const [selectedId, setNewsletterId] = useState();
  const [selectedNewsletter, setSelectedNewsletter] = useState({});

  const { data, isValidating, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}newsletters?_limit=-1&_sort=id:desc`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (!adminObj) router.push("/login");
  }, [adminObj]);

  useEffect(() => {
    if (!searchText) {
      mutate();
    }
  }, [searchText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchResult = data.filter((item) => item.title.includes(searchText));
    mutate(searchResult, false);
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setAdminObj(null);
  };

  const handleEditBtnClick = () => {
    if (isEditingAlert) setAlertMsg(alert.content);

    setAlertEditMode(!isEditingAlert);
  };

  const handleSaveBtnClick = async () => {
    const result = await editAlert(alert.id, alertMsg, token);
    if (result === 200) {
      setAlertEditMode(!isEditingAlert);
    } else {
      setMsg({
        type: "error",
        msg: "[Edit Alert Message] ⚠️ Something went wrong :(",
      });
    }
  };

  const handleNewsletterItem = (e) => {
    const id = parseInt(e.target.id);
    setNewsletterId(id);
    setSelectedNewsletter(data.filter((item) => item.id === id)[0]);
  };

  const handleDeleteBtnClick = async (e) => {
    const targetId = e.target.id;
    const deleteConfirm = confirm("Are you sure?");
    if (!deleteConfirm) {
      return false;
    }
    const result = await deleteNewsletterItem(targetId, token);
    if (result === 200) {
      mutate(data);
      setNewsletterId();
      setSelectedNewsletter({});
    } else {
      setMsg({
        type: "error",
        msg: "[Delete Newsletter] ⚠️ Something went wrong :(",
      });
    }
  };

  const handleNewsletterEditBtnClick = () => {
    setNewsltrEditMode(!isEditingNewsltr);
  };

  const handleEdited = (newForm) => {
    setSelectedNewsletter(newForm);
    setNewsltrEditMode(!isEditingNewsltr);
    mutate();
  };

  const handleCreated = (newForm) => {
    setSelectedNewsletter(newForm);
    setNewsletterId(newForm.id);
    mutate();
  };

  const handleMsg = (type, msg) => {
    setMsg({ type, msg });
  };

  return (
    adminObj && (
      <div>
        <AdminNav handleLogout={handleLogout} />
        <div className={`container`}>
          <div className={`flex flex-vertical-center`}>
            <h3 className={`mt-24 mb-24`}>Welcome, {adminObj.username} 🐥</h3>
            {msg.msg && (
              <div
                className={`ml-10 ${
                  msg.type === "error"
                    ? adminStyle["errorPanel"]
                    : adminStyle["successPanel"]
                }`}
              >
                {msg.msg}
              </div>
            )}
          </div>
          <div className={`shadow-2 mb-24 ${adminStyle["panel"]}`}>
            <h4 className={`subtitle bold mb-8`}>Alert Message</h4>
            <div className={`flex`}>
              {isEditingAlert ? (
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
                {isEditingAlert ? "Cancel" : "Edit"}
              </button>
              {isEditingAlert && (
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

          <div className={`flex mb-24`}>
            <div
              className={`shadow-2 mr-24 ${adminStyle["panel"]} ${adminStyle["newsletterPanel"]}`}
            >
              <div className={`${adminStyle["titleHeader"]}`}>
                <h4 className={`subtitle bold text-vertical-center`}>
                  Newsletter List {data && <span>({data.length})</span>}
                </h4>
              </div>
              <form onSubmit={(e) => handleSubmit(e)} className={`flex`}>
                <input
                  type="text"
                  value={searchText}
                  className={`${adminStyle["searchInput"]}`}
                  onChange={(e) => handleSearchText(e)}
                />
                <button type="submit" className={`${adminStyle["searchBtn"]}`}>
                  Search
                </button>
              </form>
              <ul className={`${adminStyle["newsletterList"]}`}>
                {!isValidating && data ? (
                  data.map((newsletter) => (
                    <li
                      key={newsletter.id}
                      className={`${adminStyle["newsletterItem"]}`}
                    >
                      <span
                        id={newsletter.id}
                        onClick={(e) => handleNewsletterItem(e)}
                        className={`text-vertical-center ${newsletter.publishing ? '' : adminStyle['stopPublishing']}`}
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
              className={`shadow-2 mr-24 ${adminStyle["panel"]} ${adminStyle["newsletterPanel"]}`}
            >
              <div className={`mb-8 ${adminStyle["titleHeader"]}`}>
                <h4 className={`subtitle bold text-vertical-center`}>
                  Newsletter Item
                </h4>
                {selectedId && (
                  <span>
                    <button
                      className={`ml-10 ${adminStyle["btn"]}`}
                      onClick={() => {
                        handleNewsletterEditBtnClick();
                      }}
                    >
                      {isEditingNewsltr ? "Cancel" : "Edit"}
                    </button>
                  </span>
                )}
              </div>
              {selectedId ? (
                !isEditingNewsltr ? (
                  <Card newsletter={selectedNewsletter} />
                ) : (
                  <NewsletterForm
                    newsletter={selectedNewsletter}
                    token={token}
                    edited={handleEdited}
                    handleMsg={handleMsg}
                  />
                )
              ) : (
                <div className={`flex-center`}>
                  No newsletter has been selected
                </div>
              )}
            </div>
            <div
              className={`shadow-2 ${adminStyle["panel"]} ${adminStyle["newsletterPanel"]}`}
            >
              <div className={`mb-8 ${adminStyle["titleHeader"]}`}>
                <h4 className={`subtitle bold text-vertical-center`}>
                  Add Newsletter
                </h4>
              </div>
              <NewsletterForm
                token={token}
                created={handleCreated}
                handleMsg={handleMsg}
              />
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
