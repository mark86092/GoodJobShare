import {
  generateIndexURL,
  generatePageURL,
  generateTabURL,
  pageTypeTranslation,
  TabType,
  tabTypeTranslation,
} from 'constants/companyJobTitle';

const generateRootLayer = () => ({
  label: 'GoodJob',
  to: '/',
});

const generatePageTypeLayer = ({ pageType }) => ({
  label: pageTypeTranslation[pageType],
  to: generateIndexURL({ pageType }),
});

const generatePageNameLayer = ({ pageType, pageName, pageDisplayName }) => ({
  label: pageDisplayName,
  to: generatePageURL({ pageType, pageName }),
});

const generateTabTypeLayer = ({ pageType, pageName, tabType }) => ({
  label: tabTypeTranslation[tabType],
  to: generateTabURL({
    pageType,
    pageName,
    tabType,
  }),
});

// pageName 用來組網址，pageDisplayName 是麵包屑上顯示的字（預設同 pageName）
export const generateBreadCrumbData = ({
  pageType,
  pageName,
  pageDisplayName = pageName,
  tabType,
}) => {
  const data = [
    generateRootLayer(),
    generatePageTypeLayer({ pageType }),
    generatePageNameLayer({ pageType, pageName, pageDisplayName }),
  ];

  // TODO: adhoc solution if the page is OVERVIEW
  if (tabType === TabType.OVERVIEW) {
    return data;
  }

  data.push(generateTabTypeLayer({ pageType, pageName, tabType }));

  return data;
};
