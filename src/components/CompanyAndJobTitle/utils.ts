import {
  generateIndexURL,
  generatePageURL,
  generateTabURL,
  PageType,
  pageTypeTranslation,
  TabType,
  tabTypeTranslation,
} from 'constants/companyJobTitle';

type BreadcrumbItem = { label: string; to: string };

const generateRootLayer = (): BreadcrumbItem => ({
  label: 'GoodJob',
  to: '/',
});

const generatePageTypeLayer = ({
  pageType,
}: {
  pageType: PageType;
}): BreadcrumbItem => ({
  label: pageTypeTranslation[pageType],
  to: generateIndexURL({ pageType }),
});

const generatePageNameLayer = ({
  pageType,
  pageName,
}: {
  pageType: PageType;
  pageName: string;
}): BreadcrumbItem => ({
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
}): BreadcrumbItem => ({
  label: tabTypeTranslation[tabType],
  to: generateTabURL({ pageType, pageName, tabType }),
});

export const generateBreadCrumbData = ({
  pageType,
  pageName,
  tabType,
}: {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
}): BreadcrumbItem[] => {
  const data = [
    generateRootLayer(),
    generatePageTypeLayer({ pageType }),
    generatePageNameLayer({ pageType, pageName }),
  ];

  // TODO: adhoc solution if the page is OVERVIEW
  if (tabType === TabType.OVERVIEW) {
    return data;
  }

  data.push(generateTabTypeLayer({ pageType, pageName, tabType }));

  return data;
};
