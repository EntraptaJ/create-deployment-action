// src/index.ts
import { getInput } from '@actions/core';
import { context, GitHub } from '@actions/github';

const githubToken = getInput('githubToken');
const octokit = new GitHub(githubToken);

async function runAction(): Promise<void> {
  const pull = await octokit.pulls.get({
    pull_number: context.payload.pull_request.number,
    owner: context.repo.owner,
    repo: context.repo.repo
  });
  console.log(pull);
  // octokit.pulls.get()
}

runAction();
