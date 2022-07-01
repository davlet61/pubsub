// import { join } from 'path';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';

const gmail = google.gmail('v1');

async function runSample() {
  // Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: '/home/dovlat/auth-key.json',
    scopes: [
      'https://mail.google.com/',
      'https://www.googleapis.com/auth/gmail.metadata',
      'https://www.googleapis.com/auth/gmail.lables',
      'https://www.googleapis.com/auth/gmail.readonly',
    ],
  });
  google.options({ auth });

  const res = await gmail.users.watch({
    userId: 'me',
    requestBody: {
      topicName: 'projects/suitecrm-calendar-331322/topics/arbeidsseddel',
      labelIds: ['INBOX'],
    },
  });
  console.log(res.data);
  return res.data;
}

runSample().catch(console.error);

export default runSample;
