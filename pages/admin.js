import AdminNav from "../components/AdminNav";
import adminStyle from "../styles/Admin.module.css";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { parseCookies } from "nookies";
import { getUser } from "./api/admin";
import Router, { useRouter } from "next/router";
import {
  createNewsletterItem,
  deleteNewsletterItem,
  editAlert,
  getAlert,
} from "./api/newsletter";
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
    { code: "Mon", name: "M" },
    { code: "Tue", name: "T" },
    { code: "Wed", name: "W" },
    { code: "Thu", name: "T" },
    { code: "Fri", name: "F" },
    { code: "Sat", name: "S" },
    { code: "Sun", name: "S" },
  ];
  const router = useRouter();
  const [adminObj, setAdminObj] = useState(admin);
  // const [searchText, setSearchText] = useState("");
  const [alertMsg, setAlertMsg] = useState(alert.content);
  const [isEdit, setEditMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedId, setNewsletterId] = useState();
  const [newsletterForm, setNewsletterForm] = useState({
    title: "",
    description: "",
    subscriptionlink: "",
    sendingnumber: 0,
    samplelink: "",
    publishing: true,
    category: "",
    sendingterm: "weekly",
    language: "ko",
    sendingday: new Array(daysArr.length).fill(false),
    tag: new Array(3).fill(""),
  });

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
      data.filter((item) => item.id !== targetId); // FIXME: use mutate
    } else {
      setErrorMsg("[Delete Newsletter] ⚠️ Something went wrong :(");
    }
  };

  const handleAddNewTags = (e, idx) => {
    const updatedTags = newsletterForm.tag.map((tag, index) =>
      index === idx ? e.target.value : tag
    );

    setNewsletterForm(Object.assign({}, newsletterForm, { tag: updatedTags }));
  };

  const handleDaysChkbox = (idx) => {
    const updatedSendingDays = newsletterForm.sendingday.map((checked, index) =>
      index === idx ? !checked : checked
    );

    setNewsletterForm(
      Object.assign({}, newsletterForm, { sendingday: updatedSendingDays })
    );
  };

  const handleTagsValue = (tags) => {
    return tags.filter((tag) => tag.length > 0);
  };

  const handleDaysValue = (days) => {
    return days.reduce(function (acc, curr, idx) {
      if (curr === true) acc.push(daysArr[idx].code);
      return acc;
    }, []);
  };

  const validateNewsltrForm = () => {
    let isValid = true;

    if (!newsletterForm.title) {
      isValid = false;
    }

    if (!newsletterForm.subscriptionlink) {
      isValid = false;
    }

    if (newsletterForm.category.length <= 0) {
      isValid = false;
    }

    if (newsletterForm.tag.length <= 0) {
      isValid = false;
    }

    return isValid;
  };

  const handleSaveNewNewsltrClick = async (e) => {
    e.preventDefault();
    // TODO: form validation
    const isValid = validateNewsltrForm();

    if(isValid) {
      const newForm = {
        title: newsletterForm.title,
        description: newsletterForm.description,
        subscriptionlink: newsletterForm.subscriptionlink,
        sendingterm: newsletterForm.sendingterm,
        sendingnumber: newsletterForm.sendingnumber,
        category: newsletterForm.category,
        tag: { tag: handleTagsValue(newsletterForm.tag) },
        sendingday: {
          day: handleDaysValue(newsletterForm.sendingday),
        },
        language: newsletterForm.language,
        publishing: newsletterForm.publishing,
        samplelink: newsletterForm.samplelink,
      };
  
      
      // const result = await createNewsletterItem(newForm, token);
      // if (result === 200) {
      //   console.log("success");
        // TODO: Reload list
        setSuccessMsg("✅ New newsletter has been added!");
        setNewsletterForm({
          title: "",
          description: "",
          subscriptionlink: "",
          sendingnumber: 0,
          samplelink: "",
          publishing: true,
          category: "",
          sendingterm: "weekly",
          language: "ko",
          sendingday: new Array(daysArr.length).fill(false),
          tag: new Array(3).fill(""),
        });
      // } else {
      //   setErrorMsg("[Create Newsletter] ⚠️ Something went wrong :(");
      // }
    } else {
      return;
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
                <Card
                  newsletter={data.filter((item) => item.id === selectedId)[0]}
                />
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
              <form
                onSubmit={(e) => handleSaveNewNewsltrClick(e)}
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
                          value={newsletterForm.title}
                          className={`${adminStyle["textField"]}`}
                          onChange={(e) =>
                            setNewsletterForm(
                              Object.assign({}, newsletterForm, {
                                title: e.target.value,
                              })
                            )
                          }
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
                          value={newsletterForm.description}
                          className={`${adminStyle["textAreaField"]}`}
                          onChange={(e) =>
                            setNewsletterForm(
                              Object.assign({}, newsletterForm, {
                                description: e.target.value,
                              })
                            )
                          }
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
                          value={newsletterForm.subscriptionlink}
                          className={`${adminStyle["textField"]}`}
                          onChange={(e) =>
                            setNewsletterForm(
                              Object.assign({}, newsletterForm, {
                                subscriptionlink: e.target.value,
                              })
                            )
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
                          value={newsletterForm.samplelink}
                          className={`${adminStyle["textField"]}`}
                          onChange={(e) =>
                            setNewsletterForm(
                              Object.assign({}, newsletterForm, {
                                samplelink: e.target.value,
                              })
                            )
                          }
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
                          value={newsletterForm.sendingnumber}
                          className={`${adminStyle["textField"]}`}
                          onChange={(e) =>
                            setNewsletterForm(
                              Object.assign({}, newsletterForm, {
                                sendingnumber: e.target.value,
                              })
                            )
                          }
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
                          value={newsletterForm.category}
                          onChange={(e) =>
                            setNewsletterForm(
                              Object.assign({}, newsletterForm, {
                                category: e.target.value,
                              })
                            )
                          }
                        >
                          <option>Choose a Category</option>
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
                        {newsletterForm.tag.map((item, idx) => (
                          <input
                            key={idx}
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
                          value={newsletterForm.sendingterm}
                          onChange={(e) =>
                            setNewsletterForm(
                              Object.assign({}, newsletterForm, {
                                sendingterm: e.target.value,
                              })
                            )
                          }
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
                          <label id={day.code} key={day.code}>
                            {day.name}
                            <input
                              type="checkbox"
                              id={day.code}
                              name="sendingday"
                              checked={newsletterForm.sendingday[idx]}
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
                          value={newsletterForm.language}
                          onChange={(e) =>
                            setNewsletterForm(
                              Object.assign({}, newsletterForm, {
                                language: e.target.value,
                              })
                            )
                          }
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
                          checked={newsletterForm.publishing}
                          onChange={(e) =>
                            setNewsletterForm(
                              Object.assign({}, newsletterForm, {
                                publishing: !newsletterForm.publishing,
                              })
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <input
                          type="submit"
                          value="SAVE"
                          className={`${adminStyle["submitBtn"]}`}
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
