import { env } from "@/constants/env.server";
export const GET = () => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&redirect_uri=${env.GITHUB_REDIRECT_URI}&scope=user:email`;
  return Response.redirect(githubAuthUrl);
};
