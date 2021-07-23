import AdminNav from "../components/AdminNav";
import adminStyle from "../styles/Admin.module.css";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import qs from "qs";
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
  const categoryArr = [
    { code: "economy", title: "경제" },
    { code: "education", title: "교육" },
    { code: "news", title: "뉴스" },
    { code: "design", title: "디자인" },
    { code: "lifestyle", title: "라이프스타일" },
    { code: "marketing", title: "마케팅" },
    { code: "culture", title: "문화" },
    { code: "work", title: "일과 노동" },
    { code: "tech", title: "테크" },
    { code: "trend", title: "트렌드" },
    { code: "society", title: "사회" },
  ];

  const sendingTermArr = [
    { code: "daily", name: "매일" },
    { code: "weekly", name: "매주" },
    { code: "tendays", name: "10일" },
    { code: "biweekly", name: "격주" },
    { code: "monthly", name: "매달" },
    { code: "?", name: "?" },
  ];
  const router = useRouter();
  const [adminObj, setAdminObj] = useState(admin);
  const [searchText, setSearchText] = useState("");
  const [alertMsg, setAlertMsg] = useState(alert.content);
  const [isEdit, setEditMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedId, setNewsletterId] = useState();
  let { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}newsletters?_limit=-1&_sort=id:asc`,
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

  const handleAddBtn = () => {
    console.log("ADD");
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
              className={`shadow-2 mr-24 ${adminStyle["panel"]} ${adminStyle["newsletterPanel"]}`}
            >
              <div className={`${adminStyle["titleHeader"]}`}>
                <h4 className={`subtitle bold text-vertical-center`}>
                  Newsletter List
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
                {data ? (
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
                <span>
                  <button
                    className={`ml-10 ${adminStyle["btn"]}`}
                    onClick={() => {
                      // handleEditBtnClick();
                    }}
                  >
                    {isEdit ? "Cancel" : "Edit"}
                  </button>
                </span>
              </div>
              {selectedId ? (
                <Card newsletter={data[selectedId - 1]} />
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
                <span>
                  <button
                    className={`${adminStyle["btn"]}`}
                    onClick={() => {
                      // handleEditBtnClick();
                    }}
                  >
                    Save
                  </button>
                </span>
              </div>
              <form
                onSubmit={handleAddBtn}
                className={`${adminStyle["addForm"]}`}
              >
                <table>
                  <tbody>
                    <tr className={`${adminStyle["formRow"]}`}>
                      <td className={`${adminStyle["addLabel"]}`}>
                        <label htmlFor="title">Title</label>
                      </td>
                      <td className={`${adminStyle["addField"]}`}>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className={`${adminStyle["textField"]}`}
                        />
                      </td>
                    </tr>
                    <tr className={`${adminStyle["formRow"]}`}>
                      <td className={`${adminStyle["addLabel"]}`}>
                        <label htmlFor="description">Description</label>
                      </td>
                      <td className={`${adminStyle["addField"]}`}>
                        <textarea
                          name="text"
                          id="description"
                          name="description"
                          rows="10"
                          cols="30"
                          className={`${adminStyle["textAreaField"]}`}
                        />
                      </td>
                    </tr>
                    <tr className={`${adminStyle["formRow"]}`}>
                      <td className={`${adminStyle["addLabel"]}`}>
                        <label htmlFor="subscriptionlink">Sub Link</label>
                      </td>
                      <td className={`${adminStyle["addField"]}`}>
                        <input
                          type="url"
                          id="subscriptionlink"
                          name="subscriptionlink"
                          className={`${adminStyle["textField"]}`}
                        />
                      </td>
                    </tr>
                    <tr className={`${adminStyle["formRow"]}`}>
                      <td className={`${adminStyle["addLabel"]}`}>
                        <label htmlFor="samplelink">Samp Link</label>
                      </td>
                      <td className={`${adminStyle["addField"]}`}>
                        <input
                          type="url"
                          id="samplelink"
                          name="samplelink"
                          className={`${adminStyle["textField"]}`}
                        />
                      </td>
                    </tr>
                    <tr className={`${adminStyle["formRow"]}`}>
                      <td className={`${adminStyle["addLabel"]}`}>
                        <label htmlFor="sendingnumber">Sending Num</label>
                      </td>
                      <td className={`${adminStyle["addField"]}`}>
                        <input
                          type="number"
                          id="sendingnumber"
                          name="sendingnumber"
                          className={`${adminStyle["textField"]}`}
                        />
                      </td>
                    </tr>
                    <tr className={`${adminStyle["formRow"]}`}>
                      <td className={`${adminStyle["addLabel"]}`}>
                        <label htmlFor="category">Category</label>
                      </td>
                      <td className={`${adminStyle["addField"]}`}>
                        <select className={`${adminStyle["selectField"]}`}>
                          {categoryArr.map((i) => (
                            <option value={i.code} key={i.code}>
                              {i.title}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className={`${adminStyle["formRow"]}`}>
                      <td className={`${adminStyle["addLabel"]}`}>
                        <label htmlFor="tag">Tags</label>
                      </td>
                      <td className={`${adminStyle["addField"]}`}>
                        <input
                          type="text"
                          id="tag"
                          name="tag1"
                          className={`${adminStyle["tagField"]}`}
                        />
                        <input
                          type="text"
                          id="tag"
                          name="tag2"
                          className={`${adminStyle["tagField"]}`}
                        />
                        <input
                          type="text"
                          id="tag"
                          name="tag3"
                          className={`${adminStyle["tagField"]}`}
                        />
                      </td>
                    </tr>
                    <tr className={`${adminStyle["formRow"]}`}>
                      <td className={`${adminStyle["addLabel"]}`}>
                        <label htmlFor="sendingterm">Sending Term</label>
                      </td>
                      <td className={`${adminStyle["addField"]}`}>
                        <select className={`${adminStyle["selectField"]}`}>
                          {sendingTermArr.map((i) => (
                            <option value={i.code} key={i.code}>
                              {i.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className={`${adminStyle["formRow"]}`}>
                      <td className={`${adminStyle["addLabel"]}`}>
                        <label htmlFor="sendingday">Sending Days</label>
                      </td>
                      <td className={`${adminStyle["addField"]}`}>
                        M
                        <input
                          type="checkbox"
                          id="Mon"
                          value="Mon"
                          name="sendingday"
                          className={`${adminStyle["checkField"]}`}
                        ></input>
                        T
                        <input
                          type="checkbox"
                          id="Tue"
                          value="Tue"
                          name="sendingday"
                          className={`${adminStyle["checkField"]}`}
                        ></input>
                        W
                        <input
                          type="checkbox"
                          id="Wed"
                          value="Wed"
                          name="sendingday"
                          className={`${adminStyle["checkField"]}`}
                        ></input>
                        T
                        <input
                          type="checkbox"
                          id="Thu"
                          value="Thu"
                          name="sendingday"
                          className={`${adminStyle["checkField"]}`}
                        ></input>
                        F
                        <input
                          type="checkbox"
                          id="Fri"
                          value="Fri"
                          name="sendingday"
                          className={`${adminStyle["checkField"]}`}
                        ></input>
                        S
                        <input
                          type="checkbox"
                          id="Sat"
                          value="Sat"
                          name="sendingday"
                          className={`${adminStyle["checkField"]}`}
                        ></input>
                        S
                        <input
                          type="checkbox"
                          id="Sun"
                          value="Sun"
                          name="sendingday"
                          className={`${adminStyle["checkField"]}`}
                        ></input>
                      </td>
                    </tr>
                    <tr className={`${adminStyle["formRow"]}`}>
                      <td className={`${adminStyle["addLabel"]}`}>
                        <label htmlFor="language">Lang</label>
                      </td>
                      <td className={`${adminStyle["addField"]}`}>
                        <select
                          className={`${adminStyle["selectField"]}`}
                          name="language"
                          id="language"
                        >
                          <option value="ko">Korean</option>
                          <option value="en">English</option>
                        </select>
                      </td>
                    </tr>
                    <tr className={`${adminStyle["formRow"]}`}>
                      <td className={`${adminStyle["addLabel"]}`}>
                        <label htmlFor="publishing">Publishing</label>
                      </td>
                      <td className={`${adminStyle["addField"]}`}>
                        <input
                          type="checkbox"
                          id="publishing"
                          name="publishing"
                          value="true"
                          checked
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
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
