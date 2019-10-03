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

  const deployment = await octokit.repos.createDeployment({
    ref: pull.data.head.sha,
    owner: context.repo.owner,
    repo: context.repo.repo
  });

  console.log(`Deployment `, deployment);

  const deploymentStatus = await octokit.repos.createDeploymentStatus({
    owner: context.repo.owner,
    repo: context.repo.repo,
    deployment_id: deployment.data.id,
    state: 'success',
    target_url: 'https://example.com'
  });
  console.log(`Deployment Status`, deploymentStatus.data);
  // octokit.pulls.get()
}

runAction();
