import type { NextConfig } from "next";

// When this builds inside GitHub Actions, GITHUB_REPOSITORY is set automatically
// (e.g. "yourname/awaaz"). We use it to serve correctly from
// https://yourname.github.io/awaaz/ without hardcoding the repo name anywhere.
// Building locally (`npm run dev` / `npm run build` on your own machine) is
// unaffected — basePath stays empty.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubActions && repoName ? `/${repoName}` : "",
  assetPrefix: isGithubActions && repoName ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
