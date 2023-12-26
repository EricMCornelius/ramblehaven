#!/usr/bin/env runner

import {google} from 'googleapis';
import Photos from 'googlephotos';

const {tokens} = await import('./tokens.mjs');
const {client_id, client_secret, redirect_uri} = await import('./oidc.mjs');

const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

const get_url = () => {
  const scopes = [Photos.Scopes.READ_ONLY, Photos.Scopes.SHARING];

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: scopes,
    prompt: 'consent'
  });

  return url;
};

const get_token = async code => {
  await oauth2Client.setCredentials(tokens);

  if (code) {
    const {tokens} = await oauth2Client.getToken(code);
    return tokens.access_token;
  }

  const resp = await oauth2Client.getAccessToken();
  return resp.token;
};

/*
const auth_url = get_url();
console.log(auth_url);
const code = '<code here>';
const access_token = await get_token(code);
*/

const access_token = await get_token();

// console.log(access_token);

const auth = access_token;

const photos = new Photos(auth);

const {albums} = await photos.albums.list();

for (const album of albums) {
  const {title, id} = album;
  if (!(/holiday 2023/i).test(title)) {
    continue;
  }

  const {mediaItems} = await photos.mediaItems.search(id, 100);
  for (const item of mediaItems) {
    console.log(item);

    //const inst = await photos.mediaItems.get(item.id);
    //console.log(inst);
  }
}
