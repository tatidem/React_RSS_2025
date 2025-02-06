import { Comic } from '../interfaces';

export function getDescription(comic: Comic): string {
  if (
    !comic.publishedYear &&
    !comic.numberOfPages &&
    !comic.stardateFrom &&
    !comic.photonovel &&
    !comic.adaptation
  ) {
    return "Very interesting comic and that's all...";
  }

  let description = '';

  if (comic.publishedYear) {
    description += `Published in ${comic.publishedYear}`;
    if (comic.publishedMonth) {
      description += `, month ${comic.publishedMonth}`;
      if (comic.publishedDay) {
        description += `, day ${comic.publishedDay}`;
      }
    }
    description += '.';
  } else {
    description += 'Publication date is unknown.';
  }

  if (comic.numberOfPages) {
    description += ` It has ${comic.numberOfPages} pages.`;
  }

  if (comic.stardateFrom) {
    description += ` Stardate from ${comic.stardateFrom}`;
    if (comic.stardateTo) {
      description += ` to ${comic.stardateTo}`;
    }
    description += '.';
  }

  if (comic.photonovel) {
    description += ' This is a photonovel.';
  } else {
    description += ' This is not a photonovel.';
  }

  if (comic.adaptation) {
    description += ' It is an adaptation.';
  } else {
    description += ' It is not an adaptation.';
  }

  return description.trim();
}
