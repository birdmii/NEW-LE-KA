import AdminNav from "../components/AdminNav";
import adminStyle from "../styles/Admin.module.css";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { parseCookies } from "nookies";
import { getUser } from "./api/admin";
import Router, { useRouter } from "next/router";
import { deleteNewsletterItem, editAlert, getAlert } from "./api/newsletter";
import Card from "../components/Card";
import NewsletterForm from "../components/NewsletterForm";

const fetcher = (url) => fetch(url).then((res) => res.json());

const admin = ({ admin, token, alert }) => {
  const router = useRouter();
  const [adminObj, setAdminObj] = useState(admin);
  // const [searchText, setSearchText] = useState("");
  const [alertMsg, setAlertMsg] = useState(alert.content);
  const [isEditingAlert, setAlertEditMode] = useState(false);
  const [isEditingNewsltr, setNewsltrEditMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedId, setNewsletterId] = useState();
  const [selectedNewsletter, setSelectedNewsletter] = useState({});

  const { data, isValidating, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}newsletters?_limit=-1&_sort=id:desc`,
    fetcher
  );

  useEffect(() => {
    if (!adminObj) router.push("/login");
  }, [adminObj]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(searchText);
  // };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleLogout = () => {
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
      setErrorMsg("[Edit Alert Message] ⚠️ Something went wrong :(");
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
      data.filter((item) => item.id !== targetId); // FIXME: use mutate
      mutate(data);
      setNewsletterId();
      setSelectedNewsletter({});
    } else {
      setErrorMsg("[Delete Newsletter] ⚠️ Something went wrong :(");
    }
  };

  const handleNewsletterEditBtnClick = () => {
    // if(isEditingNewsltr) {
    //   // Cancel clicked

    // }
    setNewsltrEditMode(!isEditingNewsltr);
  };

  const handleEdited = (newForm) => {
    setSelectedNewsletter(newForm);
    setNewsltrEditMode(!isEditingNewsltr);
    mutate(data.map((item) => (item.id === newForm.id ? newForm : item)));
  };

  const handleCreated = (newForm) => {
    setSelectedNewsletter(newForm);
    setNewsletterId(newForm.id);
    data.push(newForm);
    mutate(data);
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

          <div className={`flex`}>
            <div
              className={`shadow-2 mr-24 ${adminStyle["panel"]} ${adminStyle["newsletterPanel"]}`}
            >
              <div className={`${adminStyle["titleHeader"]}`}>
                <h4 className={`subtitle bold text-vertical-center`}>
                  Newsletter List {data && <span>({data.length})</span>}
                </h4>
                {/* //TODO: Search Area
                <form onSubmit={(e) => handleSubmit(e)}>
                  <input
                    type="text"
                    value={searchText}
                    className={`${adminStyle["searchInput"]}`}
                    onChange={(e) => handleSearchText(e)}
                  />
                  <button
                    type="submit"
                    className={`${adminStyle["searchBtn"]}`}
                  >
                    Search
                  </button>
                </form> */}
              </div>
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
                        className={`text-vertical-center`}
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
                {successMsg && (
                  <span className={`${adminStyle["successPanel"]}`}>
                    {successMsg}
                  </span>
                )}
              </div>
              <NewsletterForm token={token} created={handleCreated} />
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
