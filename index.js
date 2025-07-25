const axios = require("axios");
const fs = require("fs");

const GROUP_ID = 33242393;

async function fetchGroupMembers() {
  let cursor = "";
  let members = [];

  do {
    const url = `https://groups.roblox.com/v1/groups/${GROUP_ID}/users?limit=100&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ""}`;
    const res = await axios.get(url);
    const data = res.data;
    console.log(JSON.stringify(res.data, null, 2));

    data.data.forEach(user => {
      members.push({
        userId: user.user.userId,
        username: user.user.username
      });
    });

    cursor = data.nextPageCursor;
  } while (cursor);

  fs.writeFileSync("groupMembers.json", JSON.stringify(members, null, 2));
  console.log(`Fetched ${members.length} members.`);
}

fetchGroupMembers();
