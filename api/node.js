const crypto = require("node:crypto")


function mine(nonce) {
  let solution = 1;
  console.log("Mining...");

  while (true) {
    const hash = crypto.createHash("MD5");
    hash.update((nonce + solution).toString()).end();
    const attempt = hash.digest("hex");
    if (attempt.substring(0, 4) === "0000") {
      console.log(`Solved ${solution}`);
      return solution;
    }
    solution += 1;
  }
}

function handler(
  req,
  res
) {
  const nonce = req.query["value"];
  const solution = mine(nonce);
  res.status(200).json({ solution: solution })
}




module.exports = handler