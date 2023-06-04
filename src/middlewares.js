import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const portectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
    //로그인 되어 있을 경우 요청을 진행
  } else {
    return res.redirect("/login");
    //로그인 되어 있지 않은 경우 로그인페이지로 redirect
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
    //로그인 되어 있지 않을 경우 요청을 진행
  } else {
    return res.redirect("/");
    //로그인되어 있을 경우 홈으로 redirect
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 30000000,
  },
});

export const videoUpload = multer({
  dest: "uploads/videos",
  limits: {
    fileSize: 100000000,
  },
});
