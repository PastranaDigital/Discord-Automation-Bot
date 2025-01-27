# Basic Bot (PD001)

## To Do

[ ] - Image of decklist

[ ] - Button to copy decklist https://stackoverflow.com/questions/73899550/discord-buttons-on-embed

[ ] - error handling if the `TimeoutError: Navigation timeout of 30000 ms exceeded`

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
