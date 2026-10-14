import { renderHook, RenderHookResult } from '@testing-library/react-hooks';

import { FetchStatus } from 'constants/fetchStatus';
import FetchBox, { getFetched, getUnfetched, toFetching } from 'utils/fetchBox';

import useKeepPreviousBox from './useKeepPreviousBox';

type Props = { box: FetchBox<string>; scope: string };

describe('useKeepPreviousBox', () => {
  const setup = (initial: Props): RenderHookResult<Props, FetchBox<string>> =>
    renderHook(({ box, scope }: Props) => useKeepPreviousBox(box, scope), {
      initialProps: initial,
    });

  it('returns the box as is when it has data', () => {
    const box = getFetched('a');
    const { result } = setup({ box, scope: 'x' });
    expect(result.current).toBe(box);
  });

  it('keeps previous data while the next box has none', () => {
    const { result, rerender } = setup({ box: getFetched('a'), scope: 'x' });
    rerender({ box: toFetching<string>(), scope: 'x' });
    expect(result.current).toEqual({
      status: FetchStatus.FETCHING,
      data: 'a',
    });
  });

  it('drops previous data when scope changes', () => {
    const { result, rerender } = setup({ box: getFetched('a'), scope: 'x' });
    rerender({ box: toFetching<string>(), scope: 'y' });
    expect(result.current.data).toBeUndefined();
  });

  it('returns unfetched box when there is no previous data', () => {
    const box = getUnfetched<string>();
    const { result } = setup({ box, scope: 'x' });
    expect(result.current).toBe(box);
  });
});
