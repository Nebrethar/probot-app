/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  /*app.on('pull_request.opened', async context => {
    app.log("PR OPENED");
    const PRC = context.issue({ body: 'It Works!!' })
    return context.github.issues.createComment(PRC)
  })

const events = [
    'pull_request',
    'pull_request_review',
    'pull_request_review_comment'
  ]*/

  app.on('pull_request.opened', breako);
  async function breako(context) {
      try {
      const prnum = context.payload.pull_request.number;
      const pending = "https://img.shields.io/badge/D%26I-Pending-red?style=flat-square&labelColor=583586&&link=https://github.com/Nebrethar/probot-app/pull/" + prnum + "/&logo=data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1MCAyNTAiPgo8cGF0aCBmaWxsPSIjMUM5QkQ2IiBkPSJNOTcuMSw0OS4zYzE4LTYuNywzNy44LTYuOCw1NS45LTAuMmwxNy41LTMwLjJjLTI5LTEyLjMtNjEuOC0xMi4yLTkwLjgsMC4zTDk3LjEsNDkuM3oiLz4KPHBhdGggZmlsbD0iIzZBQzdCOSIgZD0iTTE5NC42LDMyLjhMMTc3LjIsNjNjMTQuOCwxMi4zLDI0LjcsMjkuNSwyNy45LDQ4LjVoMzQuOUMyMzYuMiw4MC4yLDIxOS45LDUxLjcsMTk0LjYsMzIuOHoiLz4KPHBhdGggZmlsbD0iI0JGOUNDOSIgZD0iTTIwNC45LDEzOS40Yy03LjksNDMuOS00OS45LDczLTkzLjgsNjUuMWMtMTMuOC0yLjUtMjYuOC04LjYtMzcuNS0xNy42bC0yNi44LDIyLjQKCWM0Ni42LDQzLjQsMTE5LjUsNDAuOSwxNjIuOS01LjdjMTYuNS0xNy43LDI3LTQwLjIsMzAuMS02NC4ySDIwNC45eiIvPgo8cGF0aCBmaWxsPSIjRDYxRDVGIiBkPSJNNTUuNiwxNjUuNkMzNS45LDEzMS44LDQzLjMsODguOCw3My4xLDYzLjVMNTUuNywzMy4yQzcuNSw2OS44LTQuMiwxMzcuNCwyOC44LDE4OEw1NS42LDE2NS42eiIvPgo8L3N2Zz4K";
      const badge = "[![badge-level-pending](" + pending + ")](" + prnum + ")";
      context.github.issues.createComment(context.issue({ body: "Find your PENDING badge here: " + badge + "\n\`\`\`\nMARKDOWN " + badge + "\n\`\`\`"}));
      } catch (error) {
          if (error.code !== 404) {
              throw error;
          }
      }
  }

  app.on('pull_request.assigned', receive);
  async function receive(context) {
      try {
      context.github.issues.createComment(context.issue({ body: 'Assigned' }));
      } catch (error) {
          if (error.code !== 404) {
              throw error;
          }
      }
  }

  app.on('pull_request.labeled', comment);
  async function comment(context) {
      //app.log(context);
      lname = context.payload.label.name;
      app.log("LNAME = " + lname);
      if (lname == "pending" || lname == "passing" || lname == "gold" || lname == "silver") {
        app.log("-" + lname + "-");
        let flavor = "default-fail-red";
        if(lname == "pending") {
          app.log("Pending Delivered");
          flavor = "D%26I-Pending-red";
        }
        else if(lname == "passing") {
          app.log("Passing Delivered");
          flavor = "D%26I-Passing-passing";
        }
        else if(lname == "silver") {
          app.log("Silver Delivered");
          flavor = "D%26I-Silver-silver";
        }
        else if(lname == "gold") {
          app.log("Gold Delivered");
          flavor = "D%26I-Gold-yellow";
        }
        let labeltext = lname;
        const prnum = context.payload.pull_request.number;
        const url = "https://img.shields.io/badge/" + flavor + "?style=flat-square&labelColor=583586&&link=https://github.com/Nebrethar/probot-app/pull/" + prnum + "/&logo=data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1MCAyNTAiPgo8cGF0aCBmaWxsPSIjMUM5QkQ2IiBkPSJNOTcuMSw0OS4zYzE4LTYuNywzNy44LTYuOCw1NS45LTAuMmwxNy41LTMwLjJjLTI5LTEyLjMtNjEuOC0xMi4yLTkwLjgsMC4zTDk3LjEsNDkuM3oiLz4KPHBhdGggZmlsbD0iIzZBQzdCOSIgZD0iTTE5NC42LDMyLjhMMTc3LjIsNjNjMTQuOCwxMi4zLDI0LjcsMjkuNSwyNy45LDQ4LjVoMzQuOUMyMzYuMiw4MC4yLDIxOS45LDUxLjcsMTk0LjYsMzIuOHoiLz4KPHBhdGggZmlsbD0iI0JGOUNDOSIgZD0iTTIwNC45LDEzOS40Yy03LjksNDMuOS00OS45LDczLTkzLjgsNjUuMWMtMTMuOC0yLjUtMjYuOC04LjYtMzcuNS0xNy42bC0yNi44LDIyLjQKCWM0Ni42LDQzLjQsMTE5LjUsNDAuOSwxNjIuOS01LjdjMTYuNS0xNy43LDI3LTQwLjIsMzAuMS02NC4ySDIwNC45eiIvPgo8cGF0aCBmaWxsPSIjRDYxRDVGIiBkPSJNNTUuNiwxNjUuNkMzNS45LDEzMS44LDQzLjMsODguOCw3My4xLDYzLjVMNTUuNywzMy4yQzcuNSw2OS44LTQuMiwxMzcuNCwyOC44LDE4OEw1NS42LDE2NS42eiIvPgo8L3N2Zz4K";
        const badge = "[![badge-level-" + labeltext + "](" + url + ")](" + prnum + ")";
        context.github.issues.createComment(context.issue({ body: "Find your " + labeltext.toUpperCase() + " badge here: " + badge + "\n\`\`\`\nMARKDOWN " + badge + "\n\`\`\`"}));
        context.github.issues.createComment(context.issue({ body: "A decision has been made by our moderation team. The issue will be closed now."}));
        context.github.issues.update(context.issue({state: 'closed'}))
      }
  }

  //app.on('pull_request', 

//context.github.issues.edit(context.issue({state: 'closed'}))

/*  app.on(events, async context => {
    // An issue was opened or edited, what should we do with it?
    app.log(context)
  })*/

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
