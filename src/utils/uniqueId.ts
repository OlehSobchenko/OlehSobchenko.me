import { customAlphabet } from 'nanoid';
import config from '@/config';

const uniqueId = customAlphabet(config.idAlphabet, 8);

export default uniqueId;
