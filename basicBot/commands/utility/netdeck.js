const { SlashCommandBuilder } = require('discord.js');

const baseUrl = 'https://play.limitlesstcg.com/decks/';
const endingUrl = '?format=standard&rotation=2023&set=TEF';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('netdeck')
		.setDescription('Net Deck the top play.limitless deck')
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
		// const url = document.querySelectorAll(".fa-list-alt")[0].parentElement.href;
		const archetype = interaction.options.getString('archetype');
		let url = `${baseUrl}${archetype}${endingUrl}`;
		await interaction.reply({
			content: `
Play.Limitless
${url}
			`,
			ephemeral: true, //? this will make the message only visible to the executor
		});
	},
};
