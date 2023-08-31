/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

async function postData(url, data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json(); 
}

module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on(["issues.opened", "issues.closed", "issues.reopened", "pull_request.opened"], async (context) => {
    
    const issuePayload = context.payload;
    const issue = issuePayload.issue.body;
    const isExecuteCommand = issue.includes("/execute");
    if(isExecuteCommand) {
      console.log("entered 1\n")
      if(issue.includes('Language')) {
        console.log("entered 2\n")
        // code
        const eidx = issue.indexOf('/execute')+8
        const code = issue.substring(eidx, issue.indexOf('Language')-1)
        const index = issue.indexOf("Language")+10
        const len = issue.length
        const lang = issue.substring(index, len)

        // PISTON API
        const url = 'https://emkc.org/api/v1/piston/execute'
        const data = {
          language: `${lang}`,
          source: `${code}`
        }
        let responseComment = ''
        postData(url, data).then((data) => {
          console.log(data)
          responseComment = context.issue({
            body: `Output: \n${data.output}`
          })
          return context.octokit.issues.createComment(responseComment)
        }).catch((err) => console.log(err))
      } else {
        const responseComment = context.issue({
          body: "Code and/or language not found in the expected format."
        })
        return context.octokit.issues.createComment(responseComment)
      }
    } 
    else {
      const issueComment = context.issue({
        body: "No /execute command found",
      });
      return context.octokit.issues.createComment(issueComment);
    }
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};