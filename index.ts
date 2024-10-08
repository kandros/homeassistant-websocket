import dotenv from "dotenv";
dotenv.config();

const token = process.env.HOME_ASSISTANT_AUTH_TOKEN;
if (!token) {
  console.error("Error: process.env.HOME_ASSISTANT_AUTH_TOKEN is required");
  process.exit(1);
}

const url = "ws://homeassistant.local:8123/api/websocket";
const socket = new WebSocket(url);

/* Utils */

function send(payload: object) {
  socket.send(JSON.stringify(payload));
}

function authenticate() {
  send({
    type: "auth",
    access_token: token,
  });
}

function subscribeToEvents(eventType?: string) {
  send({
    id: 1 /* any number is ok, an integer that the caller can use to correlate messages to responses. */,
    type: "subscribe_events",
    event_type: eventType,
  });
}

/* Program */

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "event") {
    console.log("Event", data.event.event_type, data.event.data.entity_id, data.event.data);
  } else {
    console.log("message", data);
  }
});

socket.onopen = async function (event) {
  console.log("WebSocket connection opened:", event);
  authenticate();
  subscribeToEvents();
};
