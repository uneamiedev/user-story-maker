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

	_commit(userStories) {
		this.onUserStoryListChanged(userStories);
		localStorage.setItem('userStories', JSON.stringify(userStories));
	}

	bindUserStoryChanged(callback) {
		this.onUserStoryListChanged = callback;
	}
}

export default UserStory;