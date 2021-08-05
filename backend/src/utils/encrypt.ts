import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import * as dayjs from 'dayjs';
import { promisify } from 'util';

const encrypt = async (data: Record<any, any>, key: string, ttlMinutes: number): Promise<string> => {
  const iv = randomBytes(16);
  data['expired'] = dayjs().add(ttlMinutes, 'minutes').unix();
  const keyTransform = (await promisify(scrypt)(key, 'salt', 32)) as Buffer;
  const cipher = createCipheriv('aes-256-ctr', keyTransform, iv);
  const encryptedData = Buffer.concat([cipher.update(JSON.stringify(data)), cipher.final()]);
  const result = { data: encryptedData.toString('base64'), iv: iv.toString('base64') };
  return Buffer.from(JSON.stringify(result)).toString('base64');
};

const decrypt = async (encryptedText: string, key: string): Promise<Record<any, any>> => {
  const data = Buffer.from(encryptedText, 'base64').toString();
  const iv = Buffer.from(JSON.parse(data)['iv'], 'base64');
  const text = Buffer.from(JSON.parse(data)['data'], 'base64');
  const keyTransform = (await promisify(scrypt)(key, 'salt', 32)) as Buffer;
  const decipher = createDecipheriv('aes-256-ctr', keyTransform, iv);
  const decryptText = Buffer.concat([decipher.update(text), decipher.final()]).toString();
  const decryptJson = JSON.parse(decryptText);
  if (dayjs().isAfter(dayjs.unix(decryptJson['expired']))) {
    throw 'Expired key';
  }
  return decryptJson;
};

export { encrypt, decrypt };
