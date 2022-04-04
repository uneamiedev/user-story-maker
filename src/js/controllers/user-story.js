import UserStory from '../models/user-story';
import UserStoryView from '../views/user-story';

class UserStoryController {
	constructor() {
		this.userStoryModel = new UserStory;
		this.userStoryView = new UserStoryView;

		this.userStoryView.bindAdd(this.handleAdd);
	}

	handleAdd = userStoryContent => {
		this.userStoryModel.add(userStoryContent);
	}
}

export default UserStoryController;