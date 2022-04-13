import React from 'react';
const FriendBar = (props) => {

    const [state, setState] = React.useState([

        { id: 1, image: "/images/Friend_1.jpg", name: "Friend 1" },
        { id: 2, image: "/images/Friend_2.jpg", name: "Friend 2" },
        { id: 3, image: "/images/Friend_3.jpeg", name: "Friend 3" },
        { id: 4, image: "/images/Friend_4.jpg", name: "Friend 4" },
        { id: 5, image: "/images/friends.jpg", name: "Friends" },
        { id: 6, image: "/images/social_image.jpg", name: "Social Image" },
        { id: 7, image: "/images/friendship.jpg", name: "Friend 6" },
    ])
    const SearchFriend = (user) => {
        props.SearchFriend(user);
    };
    return (
        <div className="friendBar">
            {state.map((user) => (
                <div className="friendBar_list" key={user.id} onclick={() => SearchFriend(user)}>
                    <div className="friendBar_list-img">
                        <img src={user.image} alt="user" />
                    
                    </div>
                    <div className="friendBar_list-name">{user.name}</div>
                </div>
            ))}
        </div>
    );
};
export default FriendBar;