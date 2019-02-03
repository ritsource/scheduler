import safeBuffer from 'safe-buffer';
import Keygrip from 'keygrip';

import keys from '../../../../api/src/config/keys';

export default (userId) => {
  const Buffer = safeBuffer.Buffer;
  const sessionObj = { passport: { user: userId } };
  const session = Buffer.from(JSON.stringify(sessionObj)).toString('base64');

  const keygrip = new Keygrip([ keys.cookie_key ]);
  const signature = keygrip.sign('session=' + session);

  return { session, signature };
}