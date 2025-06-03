import { Localization } from '@/i18n/config';

export type Category = {
  id: string;
  name: Localization;
};

export type Type = {
  id: string;
  name: Localization;
  icon?: string;
};

export type LinkItem = {
  common: string;
  localization?: Localization;
};

export type PostImage = {
  data?: string;
  link?: LinkItem;
};

export type PostVideo = {
  link?: LinkItem;
  data?: string;
};

export type PostAudio = {
  name?: Localization;
  description?: Localization;
  link?: LinkItem;
};

export type Post = {
  id: string;
  path: string;
  title?: Localization;
  categoryId?: string;
  typeId?: string;
  type?: Type;
  category?: Category;
  createdAt: string;
  happenedAt: string;
  shortDescription?: Localization;
  description?: Localization;
  quote?: Localization;
  link?: LinkItem;
  image?: PostImage;
  video?: PostVideo;
  audio?: PostAudio;
};
