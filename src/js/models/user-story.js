class UserStory {
	static id = 0;

	constructor() {
		this.userStories = JSON.parse(localStorage.getItem('userStories')) || [];
	}

	add(userStoryContent) {
		const userStory = {
			id: ++UserStory.id,
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