import { customAlphabet } from 'nanoid';
import config from '@/config';

const uniqueId = customAlphabet(config.idAlphabet, config.idSize);

export default uniqueId;
