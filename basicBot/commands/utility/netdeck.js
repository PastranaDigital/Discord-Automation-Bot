const { SlashCommandBuilder, messageLink } = require('discord.js');
const puppeteer = require('puppeteer');

const baseUrl = 'https://play.limitlesstcg.com/decks/';
const endingUrl = '?format=standard&rotation=2023&set=TEF';

function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('netdeck')
		.setDescription('🕸️ Net Deck an Archetype from play.limitlesstcg')
		.addStringOption((option) =>
			option
				.setName('archetype')
				.setDescription('Select a Deck Archetype')
				.setRequired(true)
				.addChoices(
					{ name: 'Ancient Box', value: 'ancient-box' },
					{ name: 'Arceus', value: 'arceus-vstar' },
					{ name: 'Arceus Giratina', value: 'arceus-giratina' },
					{ name: 'Arceus Vulpix', value: 'arceus-vulpix' },
					{ name: 'Charizard', value: 'charizard-ex' },
					{ name: 'Chien-Pao Baxcalibur', value: 'chien-pao-baxcalibur' },
					{ name: 'Dialga Metang', value: 'dialga-metang' },
					{ name: 'Future Box', value: 'future-box' },
					{ name: 'Future Hands', value: 'iron-hands-ex' },
					{ name: 'Gardevoir', value: 'gardevoir-ex-sv' },
					{ name: 'Gholdengo', value: 'gholdengo-ex' },
					{ name: 'Giratina LZ Box', value: 'giratina-lz-box' },
					{ name: 'Great Tusk Mill', value: 'great-tusk-tef' },
					{ name: 'Lost Zone Box', value: 'lost-zone-box' },
					{ name: 'Lugia Archeops', value: 'lugia-archeops' },
					{ name: 'Other', value: 'other' },
					{ name: 'Raging Bolt Sandy Shocks', value: 'ranging-bolt-sandy-shocks' },
					{ name: 'Roaring Moon', value: 'roaring-moon-ex' },
					{ name: 'Snorlax Pidgeot', value: 'snorlax-pidgeot' },
					{ name: 'Snorlax Stall', value: 'snorlax-stall' },
				),
		),
	async execute(interaction) {
		//? since the reply is taking longer than 3 seconds
		await interaction.deferReply({ ephemeral: true });

		// console.log('interaction: ', interaction);

		const archetype = interaction.options.getString('archetype');
		let url = `${baseUrl}${archetype}${endingUrl}`;

		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.goto(url);
		//? START ACTIONS
		let result = await page.evaluate(() => {
			let tempObj = {};
			tempObj.name = document.querySelector(
				'body > div.main > div > div.infobox.deckinfo > div.text > div.name',
			)?.innerHTML;
			tempObj.format = document.querySelector(
				'body > div.main > div > div.infobox.deckinfo > div.text > div.format',
			)?.innerHTML;
			tempObj.formatScore = document.querySelector(
				'body > div.main > div > div.infobox.deckinfo > div.text > div.score',
			)?.innerHTML;
			tempObj.player = document.querySelector(
				'body > div.main > div > div.x-container > table > tbody > tr:nth-child(2) > td:nth-child(1) > a',
			)?.innerHTML;
			tempObj.tournament = document.querySelector(
				'body > div.main > div > div.x-container > table > tbody > tr:nth-child(2) > td:nth-child(2) > a',
			)?.innerHTML;
			tempObj.tournamentURL = document.querySelector(
				'body > div.main > div > div.x-container > table > tbody > tr:nth-child(2) > td:nth-child(2) > a',
			)?.href;
			tempObj.date = document.querySelector(
				'body > div.main > div > div.x-container > table > tbody > tr:nth-child(2) > td:nth-child(3) > a',
			)?.innerHTML;
			tempObj.rank = document.querySelector(
				'body > div.main > div > div.x-container > table > tbody > tr:nth-child(2) > td:nth-child(4) > a',
			)?.innerHTML;
			tempObj.score = document.querySelector(
				'body > div.main > div > div.x-container > table > tbody > tr:nth-child(2) > td:nth-child(5) > a',
			)?.innerHTML;
			tempObj.decklistUrl = document.querySelectorAll('.fa-list-alt')[0]?.parentElement.href;

			return tempObj;
		});
		console.log('result: ', JSON.stringify(result));

		// const decklistButtonSelector =
		// 	'body > div.main > div > div.x-container > table > tbody > tr:nth-child(2) > td:nth-child(6) > a';
		// await page.waitForSelector(decklistButtonSelector);
		// await page.click(decklistButtonSelector);

		const page2 = await browser.newPage();
		await page2.goto(result.decklistUrl);
		let decklist = await page2.evaluate(() => {
			let tempObj = {
				test: 'something',
			};
			// tempObj.player = document.querySelector('body > div.main > div > div.infobox > div.heading')?.innerHTML;
			tempObj.script = document.querySelector('body > div.main > div > div.decklist > script')?.innerHTML;
			tempObj.list = tempObj.script ? tempObj.script.split('`')[1] : 'No decklist found';
			return tempObj;
		});
		console.log('decklist: ', JSON.stringify(decklist.list));

		//? get decklist image
		if (decklist.list.length > 20) {
			console.log('decklist.list.length: ', decklist.list.length);
			const imageGeneratorUrl = 'https://ptcg-imggen.netlify.app/'; //https://limitlesstcg.com/tools/imggen;
			const imagePage = await browser.newPage();
			await imagePage.goto(imageGeneratorUrl);
			//? Set screen size
			await imagePage.setViewport({ width: 1300, height: 800 });

			// Filling out an input
			// await page.locator('input').fill('value');

			let image = await imagePage.evaluate(
				(list) => {
					const textArea = document.querySelector('#input');
					textArea.value = list;

					const submitButton = document.querySelector('#submit');
					console.log('submitButton: ', JSON.parse(JSON.stringify(submitButton)));
					submitButton.click();

					return null;
				},
				decklist.list, //? passing argument to evaluate function
			);

			// // Query for an element handle.
			// const element = await imagePage.waitForSelector('#submit');
			// await element.click();

			//? WAIT
			// await imagePage.locator('body > div.wrapper > div.output-wrapper').wait();
			await imagePage.waitForSelector('body > div.wrapper > div.output-wrapper');
			await delay(2500);
			// await imagePage.waitForTimeout(1500);
			// const submitButtonSelector = '#submit';
			// await imagePage.waitForSelector(submitButtonSelector);
			// await imagePage.click(submitButtonSelector);
			// await imagePage.waitForNavigation();
			// const [response] = await Promise.all([
			// 	page.waitForNavigation(), // The promise resolves after navigation has finished
			// 	page.click('a.my-link'), // Clicking the link will indirectly cause a navigation
			//   ]);
			await imagePage.screenshot({ path: `./deckImages/${result.name}_decklist.png` });
		}

		//? END OF ACTIONS
		await browser.close();

		await interaction.editReply({
			content: `
			<:emptyspace:1152273926123180142>
${result.name}
${result.format}
${result.formatScore}
---
Player: ${result.player} at [${result.tournament}](${result.tournamentURL})
${result.date} - ${result.rank} - (${result.score})
[Link to Decklist](${result.decklistUrl})

${decklist.list}

			`,
			ephemeral: true, //? this will make the message only visible to the executor
		});
	},
};
