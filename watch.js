// import { join } from 'path';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';

const gmail = google.gmail('v1');

const watchLabel = async () => {
  const auth = await authenticate({
    keyfilePath: '/home/dovlat/auth-key.json',
    scopes: [
      'https://mail.google.com/',
      'https://www.googleapis.com/auth/gmail.metadata',
      'https://www.googleapis.com/auth/gmail.labels',
      'https://www.googleapis.com/auth/gmail.readonly',
    ],
  });
  google.options({ auth });

  const res = await gmail.users.watch({
    userId: 'me',
    requestBody: {
      topicName: 'projects/suitecrm-calendar-331322/topics/arbeidsseddel',
      labelIds: ['Label_4847903479894356930'],
    },
  });
  console.log(res.data);
  return res.data;
};

watchLabel().catch(console.error);

export default watchLabel;
