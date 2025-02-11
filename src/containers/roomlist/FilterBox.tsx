import { FilterBox as CFiterBox } from '@/components';
import { selectFilter, setFilter } from '@/redux/filter/filterSlice';
import { closeModal, selectModal } from '@/redux/modal/modalSlice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FilterBox = () => {
  const modal = useSelector(selectModal);
  const ref = useRef<HTMLDivElement | null>(null);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const [isDown, setDown] = useState<boolean[]>([false, false, false]);
  const [selected, setSelected] = useState<string[]>([
    '최근 게임 순',
    '전체',
    '전체',
  ]);

  const onDropdown = (index: number) => {
    let copy = [...isDown];
    copy[index] = !copy[index];
    setDown(copy);
  };

  const onSelect = (e: any, index: number) => {
    let copy = [...selected];
    copy[index] = e.target.innerText;
    setSelected(copy);
    onFilter(e.target.dataset.value, index);
  };

  const onFilter = (data: string | undefined, index: number) => {
    switch (index) {
      case 0: {
        dispatch(setFilter({ ...filter, time: data }));
        break;
      }
      case 1: {
        dispatch(
          setFilter({ ...filter, type: data ? parseInt(data, 10) : undefined })
        );
        break;
      }
      case 2: {
        dispatch(
          setFilter({
            ...filter,
            start: data === undefined ? data : data === '대기중' ? false : true,
          })
        );
        break;
      }
    }
  };

  useEffect(() => {
    const offModal = (e: any) => {
      if (
        modal.modalType === 'FILTER' &&
        modal.open &&
        ref &&
        !ref.current?.contains(e.target as Node)
      ) {
        dispatch(closeModal());
      }
    };
    document.addEventListener('mousedown', offModal);

    return () => {
      document.removeEventListener('mousedown', offModal);
    };
  });

  return (
    modal.modalType === 'FILTER' &&
    modal.open && (
      <CFiterBox
        modalRef={ref}
        onDropdown={onDropdown}
        isDown={isDown}
        onSelect={onSelect}
        selected={selected}
      />
    )
  );
};

export default FilterBox;
