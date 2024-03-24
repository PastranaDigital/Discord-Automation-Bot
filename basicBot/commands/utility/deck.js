const { SlashCommandBuilder } = require('discord.js');

const baseUrl = 'https://play.limitlesstcg.com/decks/';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deck')
		.setDescription('Get Top play.limitless deck')
		.addStringOption((option) =>
			option.setName('archetype').setDescription('Enter a Deck Archetype (use - for spaces)').setRequired(false),
		),
	async execute(interaction) {
		// const url = document.querySelectorAll(".fa-list-alt")[0].parentElement.href;
		const archetype = interaction.options.getString('archetype');
		let url = `${baseUrl}${archetype}`;
		await interaction.reply({
			content: `
			Play.Limitless
${url}
			`,
			ephemeral: true, //? this will make the message only visible to the executor
		});
	},
};
