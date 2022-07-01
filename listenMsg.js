/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// Imports the Google Cloud client library
import { PubSub } from '@google-cloud/pubsub';
import { config } from 'dotenv';

config();

const subscriptionNameOrId = process.env.PUB_SUB_SUBSCRIPTION_ID;
const timeout = 60;

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

function listenForMessages() {
  // References an existing subscription
  const subscription = pubSubClient.subscription(subscriptionNameOrId);

  // Create an event handler to handle messages
  let messageCount = 0;
  const messageHandler = (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', messageHandler);

  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

listenForMessages();
