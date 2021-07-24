// Imports
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// App Imports
import ChatRooms from '../../api/chat-rooms/collection';
import ChatRoomMembers from '../../api/chat-room-members/collection';
import Chats from '../../api/chats/collection';

// User
if(Meteor.users.find().count() == 0) {
    let users = [
        { username: 'DaveRamsey', password: '123456'  },
        { username: 'RachelCruze', password: '123456'  },
        { username: 'KenColeman', password: '123456'  }
    ];

    users.forEach((user) => {
        Accounts.createUser(user);
    });

    const DaveRamsey = Meteor.users.findOne({ username: 'DaveRamsey' });
    const RachelCruze = Meteor.users.findOne({ username: 'RachelCruze' });
    const KenColeman = Meteor.users.findOne({ username: 'KenColeman' });

    // Chat Rooms
    if(ChatRooms.find().count() == 0) {
        const chatRoomId = ChatRooms.insert({ userId: DaveRamsey._id, title: 'Dave Ramsey Room', description: 'Better than I deserve.', isPublic: true });
        const chatRoomTwoId = ChatRooms.insert({ userId: RachelCruze._id, title: 'Rachel Cruze Room', description: 'Do not touch my guac.', isPublic: true });

        // Chat Room Members
        if(ChatRoomMembers.find().count() == 0) {
            ChatRoomMembers.insert({ chatRoomId, userId: DaveRamsey._id });
            ChatRoomMembers.insert({ chatRoomId, userId: RachelCruze._id });
            ChatRoomMembers.insert({ chatRoomId, userId: KenColeman._id });
        }

        // Chats
        if(Chats.find().count() == 0) {
            Chats.insert({ chatRoomId, userId: DaveRamsey._id, message: 'Hello from DaveRamsey' });
            Chats.insert({ chatRoomId, userId: RachelCruze._id, message: 'Hello from RachelCruze' });
            Chats.insert({ chatRoomId, userId: KenColeman._id, message: 'Hello from KenColeman' });
        }
    }
}