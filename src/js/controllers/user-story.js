import UserStory from '../models/user-story';
import UserStoryView from '../views/user-story';

class UserStoryController {
	constructor() {
		this.userStoryModel = new UserStory;
		this.userStoryView = new UserStoryView;

		this.userStoryModel.bindUserStoryChanged(this.onUserStoryListChanged);
		this.userStoryView.bindAdd(this.handleAdd);
		this.userStoryView.bindDelete(this.handleDelete);
		this.userStoryView.bindDeleteAll(this.handleDeleteAll);

		this.onUserStoryListChanged(this.userStoryModel.userStories);
	}

	onUserStoryListChanged = userStories => {
		this.userStoryView.display(userStories);
	}

	handleAdd = userStoryContent => {
		this.userStoryModel.add(userStoryContent);
	}

	handleDelete = id => {
		this.userStoryModel.delete(id);
	}
	
	handleDeleteAll = () => {
		this.userStoryModel.deleteAll();
	}
}

export default UserStoryController;