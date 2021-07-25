import AdminNav from "../components/AdminNav";
import adminStyle from "../styles/Admin.module.css";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { parseCookies } from "nookies";
import { getUser } from "./api/admin";
import Router, { useRouter } from "next/router";
import { deleteNewsletterItem, editAlert, getAlert } from "./api/newsletter";
import Card from "../components/Card";

const fetcher = (url) => fetch(url).then((res) => res.json());

const admin = ({ admin, token, alert }) => {
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

  const daysArr = [
    { code: "Mon", name: "월" },
    { code: "Tue", name: "화" },
    { code: "Wed", name: "수" },
    { code: "Thu", name: "목" },
    { code: "Fri", name: "금" },
    { code: "Sat", name: "토" },
    { code: "Sun", name: "일" },
  ];
  const router = useRouter();
  const [adminObj, setAdminObj] = useState(admin);
  // const [searchText, setSearchText] = useState("");
  const [alertMsg, setAlertMsg] = useState(alert.content);
  const [isEdit, setEditMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedId, setNewsletterId] = useState();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSubscriptionLink, setNewSubscriptionLink] = useState("");
  const [newSampleLink, setNewSampleLink] = useState("");
  const [newSendingNum, setNewSendingNum] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newSendingTerm, setNewSendingTerm] = useState("");
  const [newLang, setNewLang] = useState("");
  const [newIsPublishing, setNewIsPublishing] = useState(true);
  const [newTags, setNewTags] = useState(new Array(3).fill(''));
  const [newSendingDays, setNewSendingDays] = useState(new Array(daysArr.length).fill(false));

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
    if (result === 200) {
      data.filter((item) => item.id !== targetId);
    } else {
      setErrorMsg("[Delete Newsletter] ⚠️ Something went wrong :(");
    }
  };

  const handleAddBtn = () => {
    console.log("ADD");
  };

  const handleSaveNewNewsltrClick = () => {
    console.log(newSendingDays);
  };

  const handleAddNewTags = (e, idx) => {
    const updatedTags = newTags.map((tag, index) => 
      index === idx ? e.target.value : tag
    )

    setNewTags(updatedTags);
    console.log(updatedTags);
  }

  const handleDaysChkbox = (idx) => {
    const updatedSendingDays = newSendingDays.map((checked, index) =>
      index === idx ? !checked : checked
    );

    setNewSendingDays(updatedSendingDays);
  }

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
                      handleSaveNewNewsltrClick();
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
                          value={newTitle}
                          className={`${adminStyle["textField"]}`}
                          onChange={(e) => setNewTitle(e.target.value)}
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
                          value={newDescription}
                          className={`${adminStyle["textAreaField"]}`}
                          onChange={(e) => setNewDescription(e.target.value)}
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
                          value={newSubscriptionLink}
                          className={`${adminStyle["textField"]}`}
                          onChange={(e) =>
                            setNewSubscriptionLink(e.target.value)
                          }
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
                          value={newSampleLink}
                          className={`${adminStyle["textField"]}`}
                          onChange={(e) => setNewSampleLink(e.target.value)}
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
                          value={newSendingNum}
                          className={`${adminStyle["textField"]}`}
                          onChange={(e) => setNewSendingNum(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr className={`${adminStyle["formRow"]}`}>
                      <td className={`${adminStyle["addLabel"]}`}>
                        <label htmlFor="category">Category</label>
                      </td>
                      <td className={`${adminStyle["addField"]}`}>
                        <select
                          className={`${adminStyle["selectField"]}`}
                          name="category"
                          id="category"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                        >
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
                        {newTags.map((item, idx) => (
                          <input
                          type="text"
                          id={idx}
                          name="tag"
                          value={item}
                          className={`${adminStyle["tagField"]}`}
                          onChange={(e) => handleAddNewTags(e, idx)}
                        />
                        ))}
                      </td>
                    </tr>
                    <tr className={`${adminStyle["formRow"]}`}>
                      <td className={`${adminStyle["addLabel"]}`}>
                        <label htmlFor="sendingterm">Sending Term</label>
                      </td>
                      <td className={`${adminStyle["addField"]}`}>
                        <select
                          className={`${adminStyle["selectField"]}`}
                          name="sendingterm"
                          id="sendingterm"
                          value={newSendingTerm}
                          onChange={(e) => setNewSendingTerm(e.target.value)}
                        >
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
                        {daysArr.map((day, idx) => (
                          <label id={day.code}>
                            {day.code}
                            <input
                              type="checkbox"
                              id={day.code}
                              value={day.code}
                              name="sendingday"
                              className={`${adminStyle["checkField"]}`}
                              onChange={() => handleDaysChkbox(idx)}
                            ></input>
                          </label>
                        ))}
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
                          value={newLang}
                          onChange={(e) => setNewLang(e.target.value)}
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
                          checked={newIsPublishing}
                          onChange={(e) => setNewIsPublishing(!newIsPublishing)}
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
