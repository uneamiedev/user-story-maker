class UserStory {
	constructor() {
		this.userStories = JSON.parse(localStorage.getItem('userStories')) || [];
	}

	get _id() {
		return this.userStories.length > 0 ? this.userStories.length + 1 : 1;
	}

	add(userStoryContent) {
		const userStory = {
			id: this._id,
			content: userStoryContent,
		};

		this.userStories.push(userStory);
		this._commit(this.userStories);
	}

	delete(id) {
		this.userStories = this.userStories.filter(userStory => userStory.id !== parseInt(id));
		this._commit(this.userStories);
	}

	deleteAll() {
		this.userStories = [];
		this._commit(this.userStories);
		localStorage.removeItem('userStories');
	}

	copyToClipboard() {
		const rawUserStories = this.userStories.map(userStory => {
			return userStory.content;
		});

		if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
			const userStories = rawUserStories.join('\r\n');
			return navigator.clipboard.writeText(userStories);
		}

		return Promise.reject('The Clipboard API is not available.');
	}

	_commit(userStories) {
		this.onUserStoryListChanged(userStories);
		localStorage.setItem('userStories', JSON.stringify(userStories));
		this.onUserStoryListChanged(userStories);
	}

	bindUserStoryChanged(callback) {
		this.onUserStoryListChanged = callback;
	}
}

export default UserStory;