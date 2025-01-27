const { SlashCommandBuilder, messageLink, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const puppeteer = require('puppeteer');

const baseUrl = 'https://play.limitlesstcg.com/decks/';
const endingUrl = '?format=standard&rotation=2023&set=SCR';

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
					{ name: 'Raging Bolt Ogerpon', value: 'raging-bolt-ogerpon' },
					{ name: 'Charizard Pidgeot', value: 'charizard-pidgeot' },
					{ name: 'Terapagos Dusknoir', value: 'terapagos-dusknoir' },
					{ name: 'Dragapult Pidgeot', value: 'dragapult-pidgeot' },
					{ name: 'Regidrago', value: 'regidrago-vstar' },
					{ name: 'Palkia Dusknoir', value: 'palkia-dusknoir' },
					{ name: 'Lugia Archeops', value: 'lugia-archeops' },
					{ name: 'Gardevoir', value: 'gardevoir-ex-sv' },
					{ name: 'Other', value: 'other' },
					{ name: 'Snorlax Stall', value: 'snorlax-stall' },
					{ name: 'Iron Thorns', value: 'iron-thorns-ex' },
					{ name: 'Miraidon', value: 'miraidon-ex' },
					{ name: 'Dragapult Dusknoir', value: 'dragapult-dusknoir' },
					{ name: 'Pidgeot Control', value: 'pidgeot-control' },
					{ name: 'Turbo-Roaring Moon', value: 'roaring-moon-ex' },
					{ name: 'Palkia Noctowl', value: 'palkia-noctowl' },
					{ name: 'Lost Zone Box', value: 'lost-zone-box' },
					{ name: 'Gholdengo', value: 'gholdengo-ex' },
					{ name: 'Ancient Box', value: 'ancient-box' },
					{ name: 'Klawf Electrode', value: 'klawf-electrode' },
					{ name: 'Chien-Pao Baxcalibur', value: 'chien-pao-baxcalibur' },
					{ name: 'Dragapult Ex', value: 'dragapult-ex' },
					{ name: 'Lost Box Charizard', value: 'lzb-charizard' },
				),
		),
	async execute(interaction) {
		//? since the reply is taking longer than 3 seconds
		await interaction.deferReply({ ephemeral: true });

		// console.log('interaction: ', interaction);

		const archetype = interaction.options.getString('archetype');
		let url = `${baseUrl}${archetype}${endingUrl}`;

		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: 'load', timeout: 0 });
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
		await page2.goto(result.decklistUrl, { waitUntil: 'load', timeout: 0 });
		let decklist = await page2.evaluate(() => {
			let tempObj = {
				test: 'something',
			};
			// tempObj.player = document.querySelector('body > div.main > div > div.infobox > div.heading')?.innerHTML;
			tempObj.script = document.querySelector('body > div.main > div > div.decklist > script')?.innerHTML;
			tempObj.list = tempObj.script ? tempObj.script.split('`')[1] : 'No decklist found for Private Tournament';
			return tempObj;
		});
		// console.log('decklist: ', JSON.stringify(decklist.list));

		const embed = new EmbedBuilder()
			.setTitle(result.name)
			.setDescription(
				`
${result.format}
${result.formatScore}
---
Player: ${result.player} at [${result.tournament}](${result.tournamentURL})
${result.date} - ${result.rank} - (${result.score})
[Link to Decklist](${result.decklistUrl})
[Link to All Decks](${url})
				`,
			)
			.setColor('#e12c79');

		await interaction.editReply({
			content: `
\`\`\`
${decklist.list}
\`\`\`
			`,
			embeds: [embed],
			ephemeral: true,
		});

		result.namePathFriendly = result.name.replaceAll(' ', '_');
		const imagePath = `/deckImages/${result.namePathFriendly}_decklist.png`;
		const imagePathEmbed = '/Users/omarp/Documents/GitHub/Discord/basicBot' + imagePath;
		// console.log('imagePathEmbed: ', imagePathEmbed);

		//? get decklist image
		if (decklist.list.length > 50) {
			// console.log('decklist.list.length: ', decklist.list.length);
			const imageGeneratorUrl = 'https://ptcg-imggen.netlify.app/'; //https://limitlesstcg.com/tools/imggen;
			const imagePage = await browser.newPage();
			await imagePage.goto(imageGeneratorUrl, { waitUntil: 'load', timeout: 90000 });
			//? Set screen size
			await imagePage.setViewport({ width: 1300, height: 800 });

			// Filling out an input
			// await page.locator('input').fill('value');

			let image = await imagePage.evaluate(
				(list) => {
					const textArea = document.querySelector('#input');
					textArea.value = list;

					const submitButton = document.querySelector('#submit');
					// console.log('submitButton: ', JSON.parse(JSON.stringify(submitButton)));
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
			await imagePage.screenshot({ path: `./deckImages/${result.namePathFriendly}_decklist.png` });
		}

		//? END OF ACTIONS
		await browser.close();

		if (decklist.list.length > 50) {
			// //? create embed
			const file = new AttachmentBuilder(`.${imagePath}`);
			const embedDeckImage = new EmbedBuilder()
				.setTitle(result.name)
				// 				.setDescription(
				// 					`
				// ${result.format}
				// ${result.formatScore}
				// ---
				// Player: ${result.player} at [${result.tournament}](${result.tournamentURL})
				// ${result.date} - ${result.rank} - (${result.score})
				// [Link to Decklist](${result.decklistUrl})
				// 				`,
				// 				)
				.setImage(`attachment://${result.namePathFriendly}.png`)
				.setColor('#e12c79');

			await interaction.followUp({
				embeds: [embedDeckImage],
				files: [file],
				ephemeral: true,
			});
		}
	},
};

// content: `
// 			<:emptyspace:1152273926123180142>
// ${result.name}
// ${result.format}
// ${result.formatScore}
// ---
// Player: ${result.player} at [${result.tournament}](${result.tournamentURL})
// ${result.date} - ${result.rank} - (${result.score})
// [Link to Decklist](${result.decklistUrl})

// \`\`\`
// ${decklist.list}
// \`\`\`
// 			`
