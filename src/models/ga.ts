export enum GaHitType {
  Event = 'event',
  Pageview = 'pageview',
  Unknown = 'unknown',
}

export interface Ga {
  uri: string | null,
  queries: string[],
  hitType: GaHitType,

  eventDetail?: EventDetail,
}

type EventDetail = {
  category?: string,
  action?: string,
  label?: string,
}

export class GaBuilder {
  createFromUrl(url: string) {
    let decoadedUrl = url;
    try {
      decoadedUrl = decodeURIComponent(url);
    } catch (e) {
      console.warn(`URI decode error: ${e}`);
    }

    const urlParts = decoadedUrl.split('?');
    if (urlParts.length !== 2) {
      return {
        uri: null,
        queries: [],
        hitType: GaHitType.Unknown,
      } as Ga;
    }

    const queries = urlParts[1].split('&');
    const hitTypeParam = queries.filter((queryItem) => {
      return ['t=event', 't=pageview']
        .some((type) => queryItem === type);
    }).shift();

    const eventDetail = {} as EventDetail;
    queries.forEach((queryItem) => {
      if (/^ec=/.test(queryItem)) {
        eventDetail.category = queryItem.replace('ec=', '');
      }
      if (/^ea=/.test(queryItem)) {
        eventDetail.action = queryItem.replace('ea=', '');
      }
      if (/^el=/.test(queryItem)) {
        eventDetail.label = queryItem.replace('el=', '');
      }
    });

    return {
      uri: urlParts[0],
      queries: queries,
      hitType: hitTypeParam
        ? hitTypeParam.replace('t=', '') as GaHitType
        : GaHitType.Unknown,
      eventDetail: eventDetail
    } as Ga;
  }
}
