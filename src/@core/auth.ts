export const signInWithGithub = async () => {
  const githubAuthUrl = `${process.env.REACT_APP_BACKEND_API_URL}/auth/github`;
  window.location.href = githubAuthUrl; // Redirect user to github Auth
};
