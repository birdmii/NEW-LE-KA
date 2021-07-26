import { useState } from "react";
import adminStyle from "../styles/Admin.module.css";
import {
  createNewsletterItem,
  updateNewsletterItem,
} from "../pages/api/newsletter";

const NewsletterForm = ({ newsletter, token }) => {
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

  let newsletterObj = {
    title: "",
    description: "",
    subscriptionlink: "",
    sendingnumber: 0,
    samplelink: "",
    publishing: true,
    category: "",
    sendingterm: "weekly",
    language: "ko",
    sendingday: { day: new Array(daysArr.length).fill(false) },
    tag: { tag: new Array(3).fill("") },
  };

  const copiedNewsletter = newsletter
    ? JSON.parse(JSON.stringify(newsletter))
    : newsletterObj;

  function initialNewsletterData(copiedNewsletter) {
    function initialTag(tags) {
      if (tags.length < 3) {
        for (let i = 0; i < 3 - tags.length; i++) {
          tags.push("");
        }
      }

      return tags;
    }

    function initialSendingDay(days) {
      let initializedSendingDay = new Array(daysArr.length).fill(false);
      for (let i = 0; i < daysArr.length; i++) {
        for (let j = 0; j < days.length; j++) {
          if (daysArr[i].code === days[j]) initializedSendingDay[i] = true;
        }
      }
      return initializedSendingDay;
    }

    let initializedNewsletter = {
      title: copiedNewsletter.title,
      description: copiedNewsletter.description
        ? copiedNewsletter.description
        : "",
      subscriptionlink: copiedNewsletter.subscriptionlink,
      sendingnumber: copiedNewsletter.sendingnumber
        ? copiedNewsletter.sendingnumber
        : 0,
      samplelink: copiedNewsletter.samplelink
        ? copiedNewsletter.samplelink
        : "",
      publishing: copiedNewsletter.publishing,
      category: copiedNewsletter.category,
      sendingterm: copiedNewsletter.sendingterm,
      language: copiedNewsletter.language,
      sendingday: { day: initialSendingDay(copiedNewsletter.sendingday.day) },
      tag: { tag: initialTag(copiedNewsletter.tag.tag) },
    };

    return initializedNewsletter;
  }

  const [newsletterForm, setNewsletterForm] = useState(
    copiedNewsletter.id
      ? initialNewsletterData(copiedNewsletter)
      : copiedNewsletter
  );

  const handleAddNewTags = (e, idx) => {
    const updatedTags = newsletterForm.tag.tag.map((tag, index) =>
      index === idx ? e.target.value : tag
    );

    setNewsletterForm(
      Object.assign({}, newsletterForm, { tag: { tag: updatedTags } })
    );
  };

  const handleDaysChkbox = (idx) => {
    const updatedSendingDays = newsletterForm.sendingday.day.map(
      (checked, index) => (index === idx ? !checked : checked)
    );

    setNewsletterForm(
      Object.assign({}, newsletterForm, {
        sendingday: { day: updatedSendingDays },
      })
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

    if (isValid) {
      const newForm = {
        title: newsletterForm.title,
        description: newsletterForm.description,
        subscriptionlink: newsletterForm.subscriptionlink,
        sendingterm: newsletterForm.sendingterm,
        sendingnumber: newsletterForm.sendingnumber,
        category: newsletterForm.category,
        tag: { tag: handleTagsValue(newsletterForm.tag.tag) },
        sendingday: { day: handleDaysValue(newsletterForm.sendingday.day) },
        language: newsletterForm.language,
        publishing: newsletterForm.publishing,
        samplelink: newsletterForm.samplelink,
      };

      console.log(newForm);
      let result;
      if (!copiedNewsletter.id) {
        console.log('create');
        // result = await createNewsletterItem(newForm, token);
      } else {
        console.log('update');
        // result = await updateNewsletterItem(
        //   copiedNewsletter.id,
        //   newForm,
        //   token
        // );
      }

      if (result === 200) {
        console.log("success");
        // TODO: Reload list
        // setSuccessMsg("✅ New newsletter has been added!");
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
          sendingday: { day: new Array(daysArr.length).fill(false) },
          tag: { tag: new Array(3).fill("") },
        });
      } else {
        console.log("error occured");
        //   setErrorMsg("[Create Newsletter] ⚠️ Something went wrong :(");
      }
    } else {
      console.log("invalid");
      return;
    }
  };

  return (
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
              {newsletterForm.tag.tag.map((item, idx) => (
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
                    checked={newsletterForm.sendingday.day[idx]}
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
  );
};

export default NewsletterForm;
