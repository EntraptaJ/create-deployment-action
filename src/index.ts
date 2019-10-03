// src/index.ts
import { getInput } from '@actions/core';
import { context, GitHub } from '@actions/github';

const githubToken = getInput('githubToken');
const octokit = new GitHub(githubToken);

async function runAction(): Promise<void> {
  console.log(context);
  // octokit.pulls.get()

  // octokit.repos.createDeployment({ ref })
}

runAction();
