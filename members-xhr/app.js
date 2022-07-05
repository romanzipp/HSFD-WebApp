'use strict';

const host = 'http://127.0.0.1:5500';

// ------------- State -------------

let availableMembers = [];

let activeMembers = [];

// ------------- Mutators & Getters -------------

const addMember = (id) => {
    if (activeMembers.includes(id)) {
        return;
    }

    activeMembers.push(id);
};

const removeMember = (id) => {
    activeMembers = activeMembers.filter(memberId => memberId !== id);
};

const getInactiveMembers = () => {
    return availableMembers;
};

const getActiveMembers = () => {
    return availableMembers.filter(member => activeMembers.includes(member.id));
};

const isMemberActive = (id) => {
    return activeMembers.includes(id);
};

// ------------- DOM -------------

const $showMembersButton = document.querySelector('#show-members');
const $activeMembersList = document.querySelector('#active-members');
const $inactiveMembersList = document.querySelector('#available-members');
const $inactiveMembersTable = document.querySelector('#available-members-table');

$showMembersButton.addEventListener('click', () => {
    $showMembersButton.classList.add('hidden');
    $inactiveMembersTable.classList.remove('hidden');
});

const renderLists = () => {
    $activeMembersList.innerHTML = '';

    getActiveMembers().forEach(member => {
        const $li = document.createElement('li');
        $li.innerText = `${member.surname} ${member.name}`;

        $activeMembersList.append($li);
    });

    $inactiveMembersList.innerHTML = '';

    getInactiveMembers().forEach(member => {
        const $tr = document.createElement('tr');

        const $tdSurname = document.createElement('td');
        $tdSurname.innerText = member.surname;

        const $tdName = document.createElement('td');
        $tdName.innerText = member.name;

        const $tdEmail = document.createElement('td');
        $tdEmail.innerText = member.email;

        const $tdActions = document.createElement('td');

        const $addButton = document.createElement('button');
        $addButton.innerText = 'Add';

        const $removeButton = document.createElement('button');
        $removeButton.innerText = 'Remove';

        if (isMemberActive(member.id)) {
            $addButton.disabled = true;
            $addButton.classList.add('opacity-50');

            $removeButton.addEventListener('click', () => {
                removeMember(member.id);
                renderLists();
            });
        } else {
            $removeButton.disabled = true;
            $removeButton.classList.add('opacity-50');

            $addButton.addEventListener('click', () => {
                addMember(member.id);
                renderLists();
            });
        }

        $tdActions.append($addButton);
        $tdActions.append($removeButton);

        $tr.append($tdSurname);
        $tr.append($tdName);
        $tr.append($tdEmail);
        $tr.append($tdActions);

        $inactiveMembersList.append($tr);
    });
};

var req = new XMLHttpRequest();
req.addEventListener('load', function () {
    const data = JSON.parse(this.responseText);
    let i = 0;
    availableMembers = data.map(item => ({
        id: i++,
        name: item.Name,
        surname: item.Vorname,
        email: item.Email,
    }));

    console.log('Got members: `${data.length}`');

    renderLists();
});

req.open('GET', `${host}/data.json`);
req.send();
