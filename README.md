# discord-bot-token-id-thing

### Description

We are looking for a discord bot to render a token's image on the command of `!view <tokenId>`
This bot should be written in Node.Js.

Please do not hard-code your API key. use `process.env.DISCORD_BOT_KEY`

This request has come from the community.

```Hey I just had a thought. Some other servers that I'm in have a bot where you can tag a specific tokenID from the collection and it'll post it automatically in the channel. For instance using the command #6969 will trigger the bot to post an image of CFA #6969. I think it's a cool feature that enables members to quickly reference a specific CFA, and can be a nice way to inspire conversation. Thanks team```

You should use Web3 to pull from the blockchain, you can use this as inspiration.
https://github.com/geggleto/chainfaces-elimination/blob/master/src/store/index.js#L714-L734

Pretty much all of the blockchain code you need can be found in the leaderboard source.


### How to submit
1. Fork this repo into your own Github Account
2. Create a new branch in your forked repo.
3. Complete the job
4. Open a pull-request on the main repo and target your fork and branch.
5. Wait for the team to review
6. Conduct any fixes we find
7. Once it's merged, you will get the prize

### What you are competing for
You will get 2 Random CFAs from our community wallet.


---

# Requirements

1. Node 16.4.2+
1. [Node Canvas](https://github.com/Automattic/node-canvas)
   1. Used to convert the Chainface SVG to a PNG. Discord does not support attaching SVGs so we need to convert before sending to Discord.
1. [Infura Account](https://infura.io/)
   1. This is used to read from the Blockchain, specifically the SVG data for each token.
1. [Create a Discord Bot](https://discord.com/developers/applications)
   1. You will need the following permissions:
      1. Read Messages/View Channels
      1. Send Messages
      1. Send Messages in Threads
      1. Embed Links
      1. Attach Files
