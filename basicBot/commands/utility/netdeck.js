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
				.setRequired(false)
				.addChoices(
					{ name: 'Charizard', value: 'charizard-ex' },
					{ name: 'Lugia Archeops', value: 'lugia-archeops' },
					{ name: 'Future Hands', value: 'iron-hands-ex' },
					{ name: 'Chien-Pao Baxcalibur', value: 'chien-pao-baxcalibur' },
					{ name: 'Snorlax Stall', value: 'snorlax-stall' },
					{ name: 'Lost Zone Box', value: 'lost-zone-box' },
					{ name: 'Other', value: 'other' },
					{ name: 'Great Tusk Mill', value: 'great-tusk-tef' },
					{ name: 'Giratina LZ Box', value: 'giratina-lz-box' },
					{ name: 'Ancient Box', value: 'ancient-box' },
					{ name: 'Arceus Giratina', value: 'arceus-giratina' },
					{ name: 'Gardevoir', value: 'gardevoir-ex-sv' },
					{ name: 'Gholdengo', value: 'gholdengo-ex' },
					{ name: 'Future Box', value: 'future-box' },
					{ name: 'Roaring Moon', value: 'roaring-moon-ex' },
					{ name: 'Dialga Metang', value: 'dialga-metang' },
					{ name: 'Snorlax Pidgeot', value: 'snorlax-pidgeot' },
					{ name: 'Arceus', value: 'arceus-vstar' },
					{ name: 'Arceus Vulpix', value: 'arceus-vulpix' },
					{ name: 'Raging Bolt Sandy Shocks', value: 'ranging-bolt-sandy-shocks' },
				),
		),
	async execute(interaction) {
		// const url = document.querySelectorAll(".fa-list-alt")[0].parentElement.href;
		const archetype = interaction.options.getString('archetype');
		let url = `${baseUrl}${archetype}${endingUrl}`;
		await interaction.reply({
			content: `
			Play.Limitless
			:bulletpink: \`netdeck\` info here
${url}
			`,
			ephemeral: true, //? this will make the message only visible to the executor
		});
	},
};
