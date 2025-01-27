# Basic Bot (PD001)

Getting the bot online:

1. in a terminal `cd C:\Users\omarp\Documents\GitHub\Discord\basicBot\`
2. run `node index.js`
3. Ctrl + C to close

[How to make your Discord Bot always active](https://stackoverflow.com/questions/64388307/how-to-make-your-discord-bot-always-active)

<BR>

## Slash Commands

`/netdeck` - Net Deck an Archetype from play.limitlesstcg

`/log` - Log your match results for Meta Analysis

`/glc` - Gym Leader Challenge Info

<BR>

## To Do

[ ] - Image of decklist

[ ] - Button to copy decklist https://stackoverflow.com/questions/73899550/discord-buttons-on-embed

[ ] - error handling if the `TimeoutError: Navigation timeout of 30000 ms exceeded`

<BR>

## Resources

-   [Application - Discord Developer](https://discord.com/developers/applications/1221441316026585088/bot)
-   [Official Discord Js GitHub](https://github.com/discordjs/guide/blob/main/code-samples/creating-your-bot/command-deployment/deploy-commands.js)
-   [Unofficial Discord JS Bot Guide (GitHub)](https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/first-bot/your-first-bot.md)
-   [Deleting an old command](https://discordjs.guide/slash-commands/deleting-commands.html#deleting-specific-commands)
-   [Slash Command Documentation](https://discordjs.guide/slash-commands/response-methods.html#ephemeral-responses)
-   [How to make a scraper discord bot](https://medium.com/@matias42/how-to-make-a-scraper-discord-bot-with-javascript-part-1-b59a5dbb71e8)

YouTube Videos

-   [Code Your Own Discord Bot - Basics (2024)](https://www.youtube.com/watch?v=Q0JlD7gCZRs)
-   [Code Your Own Discord Bot | Basic Slash Command Handler](https://www.youtube.com/watch?v=dApRecz4BDc)
-   [Google Images Scraper](https://www.youtube.com/watch?v=GYUc46XPlEI)

<br><br>

## Setting Up Pi to Host Bot

1. [Install Raspberry Pi OS using Raspberry Pi Imager](https://www.raspberrypi.com/software/)

1. Connect peripherals

1. Used USB to bring the code over

1. Installed Node.js using command line

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

5. Then follow instructions for Linux on here: https://nodejs.org/en/download/package-manager

1. used YouTube video: [Host Your Node.js Bot 24/7 with a Raspberry Pi](https://youtu.be/FFGsDt0EMBE?si=3_UBXE-zlQH5VShV)
    - beginning at 2:32
    - navigate to basicBot folder
1. Use `pm2 start index.js` & `pm2 stop index`

1. To later update the bot on the Pi, stop bot, update files with USB then start bot again
