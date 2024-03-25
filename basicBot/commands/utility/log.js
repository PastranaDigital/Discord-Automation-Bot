const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('log').setDescription('Log your match results for Meta Analysis'),
	async execute(interaction) {
		await interaction.reply({
			content: `
📊 Standard Match Reporting Link
https://forms.gle/MqmMhuc5TkzZDeGd9 

💪 GLC Match Reporting Link
https://forms.gle/3FoMNJCeaisLK8kS8
			`,
			ephemeral: true, //? this will make the message only visible to the executor
		});
	},
};
