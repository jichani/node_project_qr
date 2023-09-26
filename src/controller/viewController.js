export const homeViewController = (req, res) => {
  const homeData = {
    data: [{ name: "철수" }, { name: "영희" }, { name: "민수" },],
  }
  res.render("home", homeData);
}

export const introduceViewController = (req, res) => {
  res.render("introduce");
};

export const courseViewController = (req, res) => {
  res.render("introduce");
};

export const qrViewController = (req, res) => {
  res.render("introduce");
};

export const profileViewController = (req, res) => {
  res.render("introduce");
};

export const joinViewController = (req, res) => {
  res.render("introduce");
};

export const loginViewController = (req, res) => {
  res.render("introduce");
};