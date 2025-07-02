import {
  pageTypeTranslation,
  tabTypeTranslation,
  tabType as TAG_TYPE,
  generateIndexURL,
  generatePageURL,
  generateTabURL,
  PageType,
  TabType,
} from 'constants/companyJobTitle';

type Layer = {
  label: string;
  to: string;
};

const generateRootLayer = (): Layer => ({
  label: 'GoodJob',
  to: '/',
});

const generatePageTypeLayer = ({
  pageType,
}: {
  pageType: PageType;
}): Layer => ({
  label: pageTypeTranslation[pageType],
  to: generateIndexURL({ pageType }),
});

const generatePageNameLayer = ({
  pageType,
  pageName,
}: {
  pageType: PageType;
  pageName: string;
}): Layer => ({
  label: pageName,
  to: generatePageURL({ pageType, pageName }),
});

const generateTabTypeLayer = ({
  pageType,
  pageName,
  tabType,
}: {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
}): Layer => ({
  label: tabTypeTranslation[tabType],
  to: generateTabURL({
    pageType,
    pageName,
    tabType,
  }),
});

export const generateBreadCrumbData = ({
  pageType,
  pageName,
  tabType,
}: {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
}): Layer[] => {
  const data = [
    generateRootLayer(),
    generatePageTypeLayer({ pageType }),
    generatePageNameLayer({ pageType, pageName }),
  ];

  // TODO: adhoc solution if the page is OVERVIEW
  if (tabType === TAG_TYPE.OVERVIEW) {
    return data;
  }

  data.push(generateTabTypeLayer({ pageType, pageName, tabType }));

  return data;
};
