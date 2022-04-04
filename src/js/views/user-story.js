class UserStoryView {
	constructor() {
		this.form = document.forms['user-story-create-form'];
	}

	bindAdd(handler) {
		this.form.addEventListener('submit', event => {
			event.preventDefault();

			if (this._hasErrors()) {
				alert(this._hasErrors());
				return;
			}

			handler(this._userStoryContent);
			this.form.reset();
		})
	}

	get _userStoryContent() {
		const user = this.form.elements.user;
		const goal = this.form.elements.goal;
		const result = this.form.elements.result;

		let userStory = `En tant que ${user.value}, je souhaite ${goal.value}`;
		if (result.value || result.value.length !== 0) {
			userStory += ` afin de ${result.value}`;
		}

		return userStory
	}

	_hasErrors() {
		const errors = [
			['user', 'en tant que', '(utilisateur final)'],
			['goal', 'je souhaite', '(objectif de la fonctionnalité)'],
		];

		let errorMessages = '';;

		errors.forEach(error => {
			if (this.form.elements[error[0]].value.trim().length === 0) {
				errorMessages += `Le champ "${error[1]}" ${error[2]} est obligatoire. \r\n`;
			}
		});

		return errorMessages.length > 0 ? errorMessages : false;
	}
}

export default UserStoryView;