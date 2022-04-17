class UserStoryView {
	constructor() {
		this.form = document.forms['user-story-create-form'];
		this.container = document.querySelector('.js-user-story-container');
		this.counter = document.querySelector('.js-user-story-counter');
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

	bindDelete(handler) {
		this.container.addEventListener('click', event => {
			if (event.target.classList.contains('js-user-story-delete')) {
				const id = event.target.dataset.id;
				handler(id);
			}
		});
	}

	bindDeleteAll(handler) {
		this.container.addEventListener('click', event => {
			if (event.target.classList.contains('js-user-story-delete-all')) {
				handler();
			}
		});
	}

	bindCopyToClipboard(handler) {
		this.container.addEventListener('click', event => {
			if (event.target.classList.contains('js-user-story-copy')) {
				handler();
			}
		});
	}

	get _userStoryContent() {
		const user = this.form.elements.user;
		const goal = this.form.elements.goal;
		const result = this.form.elements.result;

		let userStory = `En tant que ${user.value}, je souhaite ${goal.value}`;

		if (result.value || result.value.length !== 0) {
			userStory += ` afin de ${result.value}`;
		}

		return userStory;
	}

	_hasErrors() {
		const errors = [
			['user', 'en tant que', '(utilisateur final)'],
			['goal', 'je souhaite', '(objectif de la fonctionnalité)'],
		];

		let errorMessages = '';

		errors.forEach(error => {
			if (this.form.elements[error[0]].value.trim().length === 0) {
				errorMessages += `Le champ "${error[1]}" ${error[2]} est obligatoire. \r\n`;
			}
		});

		return errorMessages.length > 0 ? errorMessages : false;
	}

	display(userStories) {
		this.container.innerHTML = '';
		this.counter.textContent = userStories.length;

		if (userStories.length === 0) {
			const p = this.createElement('p');
			p.textContent = 'Aucune user story créée';
			this.container.append(p);
		} else {
			this.createButton(this.container, ['js-user-story-copy', 'button-secondary'], 'Copier toutes les user stories');
			this.createButton(this.container, ['js-user-story-delete-all', 'button-secondary', 'button-secondary--danger'], 'Supprimer toutes les user stories');
			
			const ul = this.createElement('ul');
			this.container.append(ul);

			userStories.forEach(userStory => {
				this.createUserStoryComponent(ul, userStory);
			});
		}
	}

	createElement(tag, className) {
		const element = document.createElement(tag);

		if (className) element.classList.add(...className);

		return element;
	}

	createUserStoryComponent(container, userStory) {
		const template = document.querySelector('#template-user-story');
		const li = document.importNode(template.content, true);

		const content = li.querySelector('.js-user-story-content');
		content.textContent = userStory.content;

		const deleteButton = li.querySelector('.js-user-story-delete');
		deleteButton.textContent = 'Supprimer';
		deleteButton.dataset.id = userStory.id;

		container.append(li);
	}

	createButton(container, className, text) {
		const button = this.createElement('button', className);
		button.textContent = text;
		container.append(button);
	}
}

export default UserStoryView;