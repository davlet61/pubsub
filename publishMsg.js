// import express from 'express';
import { PubSub } from '@google-cloud/pubsub';
import { config } from 'dotenv';

config();

// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

const topicNameOrId = process.env.PUB_SUB_TOPIC_ID;
const data = JSON.stringify({ greeting: 'Hi Mom!' });

// Imports the Google Cloud client library

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function publishMessage() {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);

  try {
    const messageId = await pubSubClient.topic(topicNameOrId).publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}

publishMessage();
