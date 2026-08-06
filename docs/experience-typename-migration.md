# Experience 判別欄位收攏到 `__typename`

## 背景

GraphQL 的 `Experience` 是 **interface**，有三個 implementation：`WorkExperience`、`InterviewExperience`、`InternExperience`。

要分辨手上的 experience 是哪一種，過去有兩套並行且互不協調的機制：

1. `__typename` —— GraphQL 的型別判別欄位
2. `type` scalar —— `'work'` / `'interview'` / `'intern'`，定義在 interface 上

**決定：全部收攏到 `__typename`，`type` 最終移除。**

理由是三個 implementation 的**結構本身就不同**，不只是標籤不同 —— `WorkExperience.sections` 是 `SectionWithRating`（有 `aspect`、`rating`），`InternExperience.sections` 是 `Section`（只有 `subtitle`、`content`），且 `InternExperience` 沒有 `averageSectionRating`。`__typename` 能在型別層面保證形狀，`type` 只是恰好一對一對應的 enum。

判別值的單一真相來源是 `src/constants/experienceTypename.ts`。

## 已完成

- `experiencePartialGql` 帶上 `__typename`，使用它的 query 一律取得判別欄位
- `popular_experiences`、`me.experiences` 這兩個沒走上述 fragment 的混型別清單個別補上
- `__typename` 的 enum 收攏到 `src/constants/experienceTypename.ts` 並補齊三個 member
- 補上 `... on InternExperience` fragment，修正實習心得頁面 SSR 500

## 待辦：隨 TypeScript 遷移逐步進行

剩下的工作是把消費端從讀 `type` 改成讀 `__typename`。**不建議照清單人工改**，因為目前這些檔案幾乎都還是 JS，漏接不會被任何機制擋下 —— 已知至少三處只列舉了 work/interview 兩種，intern 靜默消失（`components/Me`、`ExperienceDetail/Article/ArticleInfo`、`ExperienceDetail/MoreExperiencesBlock`）。

正確作法是先補齊型別，讓後續每一個檔案轉 TS 時，漏掉的分支自動變成編譯錯誤。

### 前置

`src/apis/experience.ts` 目前只有 `WorkExperience`。補上 `InterviewExperience`、`InternExperience`，並以 `__typename` 為判別欄位組成 discriminated union：

```ts
export type Experience = WorkExperience | InterviewExperience | InternExperience;
```

### 遷移順序

由葉往根，讓型別先穩定：

1. `src/apis/experiencesApi.js`
2. `src/components/ExperienceDetail/experienceSelector.js`
3. `src/components/ExperienceDetail/Article/`（`index.js`、`ArticleInfo.js`）
4. `src/components/ExperienceDetail/MoreExperiencesBlock/index.js`
5. `src/components/ExperienceDetail/Heading/index.js`、`src/components/ExperienceDetail/index.js`
6. `src/components/LandingPage/ExperienceBlock/helper.js`、`src/components/Me/index.js`

第 3 步的 `Article` 同時被 `ExperienceDetail` 與公司/職稱列表頁（`components/CompanyAndJobTitle/Experience.js`）使用，改動會跨兩個頁面。公司/職稱頁的 Overview 區塊則不經過 `Article`，其 Entry 元件不讀判別欄位，不受影響。

### 收尾

所有消費端遷移完成後，才從 `experiencePartialGql` 移除 `type`，並退場 `src/apis/experience.ts` 中舊的 `ExperienceType` enum（`src/apis/aspectRatingStatistics.ts` 仍在引用）。

## 已知待處理

- 三處文案不一致：同樣是 interview，`LandingPage` 顯示「面試心得」，`ExperienceDetail/Heading` 與收件匣顯示「面試經驗」，`components/Me` 顯示「面試」且完全沒有 intern 分支。是否合併為單一 translation map，建議在對應元件轉 TS 時一併決定。
- `InternExperience` 的 section 沒有 `rating` / `aspect`，也沒有 `averageSectionRating`，`Article` 的評分 UI 需要降級路徑。
- `starting_year` 是 `InternExperience` 專屬欄位，目前未顯示於任何畫面。
