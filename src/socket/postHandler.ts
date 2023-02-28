// import { Server, Socket } from "socket.io";
// import { DefaultEventsMap } from "socket.io/dist/typed-events";
// import messageController from "../controllers/message";
// import message from "../controllers/message";
// import NewRequest from "../common/Request";

// export = (
//   io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
//   socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
// ) => {
//   const getAllMessage = async (payload: any) => {
//     try {
//       const res = await messageController.getAllMessage(
//         new NewRequest(payload, socket.data.user, null, null)
//       );
//       socket.emit("post:get.response", res.body);
//     } catch (err) {
//       socket.emit("post:get.response", { status: "fail" });
//     }
//   };

//   const getMessageById = async (payload: any) => {
//     try {
//       const res = await messageController.getMessageById(
//         new NewRequest(payload, socket.data.user, null, payload.id)
//       );
//       socket.emit("post:get:id.response", res.body);
//     } catch (err) {
//       socket.emit("post:get:id.response", { status: "fail" });
//     }
//   };

//   const getMessageBySender = async (payload: any) => {
//     try {
//       const res = await messageController.getAllMessage(
//         new NewRequest(payload, socket.data.user, payload.sender, null)
//       );
//       socket.emit("post:get:sender.response", res.body);
//     } catch (err) {
//       socket.emit("post:get:sender.response", { status: "fail" });
//     }
//   };

//   const addNewMessage = async (payload: any) => {
//     try {
//       const res = await message.addNewMessage(
//         new NewRequest(payload, socket.data.user, null, null)
//       );
//       socket.emit("post:add.response", res.body);
//     } catch (err) {
//       socket.emit("post:add.response", { status: "fail" });
//     }
//   };

//   socket.on("post:get", getAllMessage);
//   socket.on("post:get:id", getMessageById);
//   socket.on("post:add", addNewMessage);
//   socket.on("post:get:sender", getMessageBySender);
// };
