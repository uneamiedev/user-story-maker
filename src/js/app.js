import '../scss/app.scss';

import UserStoryController from './controllers/user-story.js'

document.addEventListener('DOMContentLoaded', () => {
	new UserStoryController();
})