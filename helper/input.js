const prompts = require('prompts');

const DEFAULT_QUESTION = 'Please answer the question ?';

module.exports = {
	textQuestion: async ({ question = DEFAULT_QUESTION }) => {
		const { value } = await prompts({
			type: 'text',
			name: 'value',
			message: question,
		});

		return value;
	},

	selectQuestion: async ({ question = DEFAULT_QUESTION, choices = [] }) => {
		const { value } = await prompts({
			type: 'select',
			name: 'value',
			message: question,
			choices,
			initial: 1,
		});

		return value;
	},

	multiSelectQuestion: async ({
		question = DEFAULT_QUESTION,
		choices = [],
	}) => {
		const { value } = await prompts({
			type: 'multiselect',
			name: 'value',
			message: question,
			choices,
			hint: '- Space to select. Return to submit',
		});

		return value;
	},

	autocompleteQuestion: async ({
		question = DEFAULT_QUESTION,
		suggestions,
	}) => {
		const { value } = await prompts({
			type: 'autocomplete',
			name: 'value',
			message: question,
			choices: suggestions,
			fallback: `No product's comments exists`,
		});

		return value;
	},

	toggleQuestion: async ({ question = DEFAULT_QUESTION }) => {
		const { value } = await prompts({
			type: 'toggle',
			name: 'value',
			message: question,
			initial: true,
			active: 'Yes',
			inactive: 'No',
		});

		return value;
	},
};
