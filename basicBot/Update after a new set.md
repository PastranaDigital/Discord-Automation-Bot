# Update the Discord Bot for the New Format/Set

update the Decklist Image Generator first

<br><br>

## Update the ending url

-   update `const endingUrl = '?format=standard&rotation=2023&set=TEF'` with new set name in the netdeck.js file

<br><br>

## Update the selection list

1. Go to `https://play.limitlesstcg.com/decks`
2. Copy the Link Address to get the `value` for the new deck name
3. Add the new choice to the options in alphabetical order
4. Remove any decks (max 25)

<br><br>

## Deploy the command changes

1. Close out any signed in terminals `Ctrl+C`
1. Open Terminal and navigate to `cd basicBot`
1. Run `node deploy-commands.js`
1. Log bot back in, run `node index.js`

<br><br>

## Test

1. Run the slash command in Discord
2. Confirm the options have been updated for new decks
3. Confirm the decklist image is generating correctly
