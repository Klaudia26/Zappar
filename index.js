class App {
  constructor() {
    this.users = [
      {
        id: 1,
        avatar: 'img/avatars/avatar3.svg',
        name: 'Erica Badu',
        email: 'e.badu@example.com',
        role: 'Owner',
        isActive: true,
      },
      {
        id: 2,
        avatar: 'img/avatars/avatar4.svg',
        name: 'Pat Nelsson',
        email: 'p.nelsson@example.com',
        role: 'Admin',
        isActive: true,
      },
      {
        id: 3,
        avatar: 'img/avatars/avatar0.svg',
        name: 'Pending acceptance',
        email: 'j.dog@example.com',
        role: 'Standard',
        isActive: true,
      },
      {
        id: 4,
        avatar: 'img/avatars/avatar5.png',
        name: 'Amy Namy',
        email: 'a.namy@example.com',
        role: 'Standard',
        isActive: true,
      },
      {
        id: 5,
        avatar: 'img/avatars/avatar1.svg',
        name: 'Victor D.',
        email: 'v.d@example.com',
        role: 'Standard',
        isActive: true,
      },
      {
        id: 6,
        avatar: 'img/avatars/avatar2.svg',
        name: 'Olly',
        email: 'o.hunter@example.com',
        role: 'Standard',
        isActive: true,
      },
    ];

    // references to DOM elements
    this.table = document.querySelector('.list');
    this.addUserBtns = document.querySelectorAll('.add-user');
    this.numActiveUsers = document.querySelector('.active-users');

    // prettier-ignore
    this.names = ['John', 'Adam', 'Emma', 'Tom', 'Kate', 'Stave', 'Sophia', 'Mike', 'Kris'];
    this.roles = ['Admin', 'Owner', 'Standard'];
  }

  // initialize app
  init() {
    this.addUserBtns.forEach((btn) =>
      btn.addEventListener('click', this.addNewUser)
    );

    this.countActiveUsers();
    this.render();
  }

  countActiveUsers = () => {
    const numOfActiveMembers = this.users.filter((user) => user.isActive);
    this.numActiveUsers.innerText = `${numOfActiveMembers.length} / ${this.users.length}`;
  };

  generateNewUser() {
    // prettier-ignore
    const randonName = this.names[Math.floor(Math.random() * this.names.length)];
    // prettier-ignore
    const randomRole = this.roles[Math.floor(Math.random() * this.roles.length)];

    const newUser = {
      id: new Date(),
      avatar: 'img/avatars/avatar0.svg',
      name: randonName,
      email: `${randonName}@example.com`,
      role: randomRole,
      isActive: false,
    };

    return newUser;
  }

  addNewUser = () => {
    const newUser = this.generateNewUser();
    this.users = [...this.users, newUser];
    this.createUser(newUser);
    this.countActiveUsers();
  };

  removeUser(id) {
    const filteredUsers = this.users.filter((user) => user.id !== id);

    this.users = filteredUsers;
    this.render();
    this.countActiveUsers();
  }

  createUser(user) {
    // create row
    const tr = document.createElement('tr');
    const nameCell = document.createElement('td');
    const emailCell = document.createElement('td');
    const roleCell = document.createElement('td');
    const binCell = document.createElement('td');

    // create user avatar
    const avatar = document.createElement('img');
    avatar.classList.add('avatar');
    avatar.setAttribute('src', user.avatar);

    // create user name
    const span = document.createElement('span');
    span.classList.add('name');
    span.innerText = user.name;
    nameCell.appendChild(avatar);
    nameCell.appendChild(span);

    emailCell.innerText = user.email;
    roleCell.innerText = user.role;

    // create bin
    const bin = document.createElement('img');
    bin.classList.add('btn-remove');
    bin.setAttribute('src', 'img/Group.svg');
    bin.addEventListener('click', () => this.removeUser(user.id));
    binCell.appendChild(bin);

    tr.appendChild(nameCell);
    tr.appendChild(emailCell);
    tr.appendChild(roleCell);
    tr.appendChild(binCell);

    this.table.appendChild(tr);
  }

  clearTable() {
    this.table.innerHTML = '';
  }

  render() {
    this.clearTable();

    this.users.forEach((user) => this.createUser(user));
  }
}

const app = new App();

app.init();
