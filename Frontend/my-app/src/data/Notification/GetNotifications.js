import GetUserFriendStatus from "../Friend/GetUserFriendStatus";
import GetAssociatedParticipations from "../Participant/GetAssociatedParticipations";

export default async function GetNotifications(userID) {
  try {
    const [friendRequests, activityRequests] = await Promise.all([
      GetUserFriendStatus(userID),
      GetAssociatedParticipations(userID),
    ]);
    const messages = await friendRequests.concat(activityRequests);
    const result = await messages.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    return result;
  } catch (error) {
    console.log(
      "Error when fetching notification messages from teh database: " +
        JSON.stringify(error.response?.data) || error.message
    );
  }
}
