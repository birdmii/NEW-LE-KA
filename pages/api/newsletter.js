export async function getAllNewsletter() {
  const res = await fetch(`${process.env.API_URL}newsletters?publishing_eq=true&_limit=-1`);
  const newsletters = res.json();

  return newsletters;
}

export async function getData(cnt) {
  const res = await fetch(`${process.env.API_URL}newsletters?publishing_eq=true&_limit=${cnt}`);
  const newsletters = res.json();

  return newsletters;
}

export async function getCnt() {
  const res = await fetch(`${process.env.API_URL}newsletters/count?publishing_eq=true`);
  const cnt = res.json();

  return cnt;
}

export async function getAlert() {
  const res = await fetch(`${process.env.API_URL}alerts/1`);
  const alert = res.json();

  return alert;
}

export async function getCategoryData(category) {
  const res = await fetch(
    `${process.env.API_URL}newsletters?category=${category}`
  );
  const newsletters = res.json();

  return newsletters;
}

export async function getSearchResult(query) {
  const res = await fetch(`${process.env.API_URL}newsletters?${query}&publishing_eq=true`);
  const newsletters = await res.json();

  return newsletters;
}

export async function editAlert(id, alertMsg, token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}alerts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content: alertMsg,
    }),
  });

  if (res.status === 200) {
    return 200;
  } else {
    return "error";
  }
}

export async function deleteNewsletterItem(id, token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}newsletters/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    return 200;
  } else {
    return "error";
  }
}

export async function createNewsletterItem(form, token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}newsletters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return "error";
  }
}

export async function updateNewsletterItem(id, form, token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}newsletters/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return "error";
  }
}
