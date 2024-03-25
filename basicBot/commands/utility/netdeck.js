const { SlashCommandBuilder, messageLink } = require('discord.js');
const puppeteer = require('puppeteer');

const baseUrl = 'https://play.limitlesstcg.com/decks/';
const endingUrl = '?format=standard&rotation=2023&set=TEF';

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

		console.log('interaction: ', interaction);

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
			tempObj.list = tempObj.script.split('`')[1];
			return tempObj;
		});
		console.log('decklist: ', JSON.stringify(decklist.list));

		// await page.screenshot({ path: 'example.png' });
		//? END OF ACTIONS
		await browser.close();

		await interaction.editReply({
			content: `
${result.name} Deck

\`${result.rank}\` on ${result.date} going \`${result.score}\`

Full decklist: ${url}

${decklist.list}

			`,
			ephemeral: true, //? this will make the message only visible to the executor
		});
	},
};
