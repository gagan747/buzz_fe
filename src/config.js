/* eslint-disable max-len */
const apiUrl = process.env.REACT_APP_STAGE === 'production' ? 'https://chat-with-buzz.herokuapp.com/api' : 'http://localhost:5000/api';
const homeUrl = `${apiUrl}/home`;
const logoutUrl = `${apiUrl}/logout`;
const commentUrl = `${apiUrl}/comments/`;
const feedUrl = `${apiUrl}/feed/`;
const flagFeedUrl = `${apiUrl}/feed/flag/`;
const likeFeedUrl = `${apiUrl}/feed/like/`;
const ModeratorUrl = `${apiUrl}/moderator/`;
const getUserProfileUrl = `${apiUrl}/userprofile`;
const forgotPasswordUrl = `${apiUrl}/forgotpassword`;
const forgotPasswordOtpGeneratorUrl = `${apiUrl}/forgotpassword/otpgenerator`;
const loginApiUrl = `${apiUrl}/login`;
const registerApiUrl = `${apiUrl}/register`;
const searchSuggestionUrl = `${apiUrl}/search/suggestions`;
const jsonDataUrl = 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json';
const addFriendUrl = `${apiUrl}/friends/addfriend`;
const acceptFriendRequest = `${apiUrl}/friends/acceptRequest`;
const cancelFriendRequest = `${apiUrl}/friends/cancelRequest`;
const deleteFriendRequest = `${apiUrl}/friends/deleteRequest`;
const friendSuggestions = `${apiUrl}/suggestions`;
const unfriend = `${apiUrl}/friends/unFriend`;
const getFriends = `${apiUrl}/friends/getFriends`;
const getFriendRequests = `${apiUrl}/friends/getFriendRequests`;
const userProfileUpdate = `${apiUrl}/userprofile/update`;
const viewProfileUrl = `${apiUrl}/viewprofile`;
const getFriendFeedsUrl = `${apiUrl}/friendFeeds`;

export {
  apiUrl, homeUrl, logoutUrl, commentUrl, feedUrl, flagFeedUrl, likeFeedUrl, ModeratorUrl, getUserProfileUrl, forgotPasswordUrl, forgotPasswordOtpGeneratorUrl, loginApiUrl, registerApiUrl, searchSuggestionUrl, jsonDataUrl, addFriendUrl, acceptFriendRequest, cancelFriendRequest, deleteFriendRequest, friendSuggestions, unfriend, getFriends, getFriendRequests, userProfileUpdate, viewProfileUrl, getFriendFeedsUrl,
};
